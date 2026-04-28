import { getUsersDb, saveUsersDb } from "../services/services.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerController(req, res) {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).send({ error: "Missing fields" });
  }
  const users = getUsersDb();
  if (!Array.isArray(users)) {
    return res.status(500).send({ error: "DB corrupted" });
  }
  const exists = users.find(u => u.name === name);
  if (exists) {
    return res.status(409).send({ error: "Username already taken" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  users.push({
    name,
    passwordHash,
  });
  const result = saveUsersDb(users);
  if (!result.success) {
    return res.status(500).send({
      message: "Failed to save user",
    });
  }
  return res.status(201).send({
    message: "User created"
  });
}

export async function loginController(req, res) {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).send({ error: "Missing fields" });
  }
  const users = getUsersDb();
  const user = users.find(u => u.name === name);
  if (!user) {
    return res.status(401).send({ error: "Invalid credentials" });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).send({ error: "Invalid credentials" });
  }
  const token = jwt.sign(
    { name: user.name },
    "SECRET_KEY",
    { expiresIn: "1h" }
  );
  return res.status(200).send({
    message: "Login success",
    token
  });
}