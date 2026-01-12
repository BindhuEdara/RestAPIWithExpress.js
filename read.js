import fs from "fs";
import path from "path"
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const readFileData = () => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, "Data.txt");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject("Error reading file");
      } else {
        resolve(data);
      }
    });
  });
};
