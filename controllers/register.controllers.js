import {sqlConnect, sql} from "../utils/sql.js"
import crypto from 'crypto';

export const registerUser = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

  try {
    const pool = await sqlConnect();
    await pool.request()
      .input('name', sql.VarChar, name)
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, hashedPassword)
      .query('INSERT INTO users (name, username, password) VALUES (@name, @username, @password)');

    res.json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};
