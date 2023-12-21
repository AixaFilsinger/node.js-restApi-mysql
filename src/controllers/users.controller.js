import { pool } from "../db.js";


export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Buscar el usuario por correo electrónico
      const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE email = ? LIMIT 1',
        [email]
      );
  
      // Verificar si se encontró un usuario con el correo electrónico dado
      if (rows.length === 0) {
        return res.status(401).json({
          message: "Credenciales incorrectas",
        });
      }
  
      // Comparar la contraseña proporcionada con la almacenada en la base de datos
      if (password !== rows[0].password) {
        return res.status(401).json({
          message: "Credenciales incorrectas",
        });
      }
  
      // Si las credenciales son válidas, puedes devolver información del usuario si es necesario
      res.json({
        message: "Inicio de sesión exitoso",
        user: {
          id: rows[0].id,
          email: rows[0].email,
          // ...otros campos que desees devolver
        },
      });
    } catch (error) {
      console.error("Error en login:", error);
      return res.status(500).json({
        message: "Algo salió mal en el login",
        error: error.message,
      });
    }
  };
