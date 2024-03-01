import { pool } from "../db.js";

export const getRecetas = async (req, res) => {
  //res.header('Acces-Control-Allow-Origin','*')
  try {
    const [rows] = await pool.query("SELECT * FROM recetas");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};
export const getReceta = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM recetas WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "Receta not found",
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};

export const createRecetas = async (req, res) => {
  const { tituloReceta, imagen, categoria, dificultad, descripcion, ingredientes } = req.body.receta;
  console.log('creando')
  try {
    const [existingRows] = await pool.query(
      "SELECT * FROM recetas WHERE tituloReceta = ?",
      [tituloReceta]
    );

    if (existingRows.length > 0) {
      return res.status(200).json({
        message: "Ya existe una receta con ese título",
      });
    }

    const [rows] = await pool.query(
      "INSERT INTO recetas (tituloReceta, imagen, categoria, dificultad, descripcion, ingredientes) VALUES (?, ?, ?, ?, ?, ?)",
      [tituloReceta, imagen, categoria, dificultad, descripcion, ingredientes]
    );
    res.send({
      id: rows.insertId,
      tituloReceta, imagen, categoria, dificultad, descripcion, ingredientes
    });
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};

export const updateRecetas = async (req, res) => {
  const { id } = req.params;
  const { tituloReceta, imagen, categoria, dificultad, descripcion, ingredientes } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE recetas SET tituloReceta = ?, imagen = ?, categoria = ?, dificultad = ?, descripcion = ?, ingredientes = ? WHERE id = ?",
      [tituloReceta, imagen, categoria, dificultad, descripcion, ingredientes, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Receta not found",
      });

    const [rows] = await pool.query("SELECT * FROM recetas WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};

export const deleteRecetas = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM recetas WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Receta not found",
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};

