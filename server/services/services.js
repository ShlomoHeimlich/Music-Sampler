import fs from "node:fs";
import bcrypt from "bcrypt";

const dbusers = "C:/Users/HP/Desktop/Music- Sampler/server/db/dbusers.json";

export function getUsersDb() {
  try {
    const data = fs.readFileSync(dbusers, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export function saveUsersDb(users) {
  try {
    fs.writeFileSync(dbusers, JSON.stringify(users, null, 2));
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}