import { sqlConnect, sql } from "../utils/sql.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

  try {
    const pool = await sqlConnect();

    const data = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM users WHERE username = @username");

    const user = data.recordset[0];

    if (!user) {
      return res.status(401).json({ isLogin: false, message: "Usuario no encontrado" });
    }

    const isLogin = user.password === hashedPassword;

    if (isLogin) {
      const token = jwt.sign({sub: data.recordset[0].id}, process.env.JWT, { expiresIn: "1h", })
      res.status(200).json({ isLogin: true, user, token: token });
    } else {
      res.status(401).json({ isLogin: false, message: "Contraseña incorrecta" });
    }
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ isLogin: false, message: "Error del servidor" });
  }
};
