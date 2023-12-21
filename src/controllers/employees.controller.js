import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
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
export const getEmployee = async (req, res) => {
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

export const createEmployees = async (req, res) => {
  const { tituloReceta, imagen, categoria, dificultad, descripcion } = req.body.receta;
  console.log('creando')
  try {
    const [rows] = await pool.query(
      "INSERT INTO recetas (tituloReceta, imagen, categoria, dificultad, descripcion) VALUES (?, ?, ?, ?, ?)",
      [tituloReceta, imagen, categoria, dificultad, descripcion]
    );
    res.send({
      id: rows.insertId,
      tituloReceta, imagen, categoria, dificultad, descripcion
    });
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};

export const updateEmployees = async (req, res) => {
  const { id } = req.params;
  const { tituloReceta, imagen, categoria, dificultad, descripcion } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE recetas SET tituloReceta = ?, imagen = ?, categoria = ?, dificultad = ?, descripcion = ? WHERE id = ?",
      [tituloReceta, imagen, categoria, dificultad, descripcion, id]
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

export const deleteEmployees = async (req, res) => {
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

