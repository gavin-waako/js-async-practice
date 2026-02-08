import fs from 'fs'

let contents = fs.promises.readFile("groceries.txt", "utf-8");
console.log();