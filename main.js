import fs from "fs";

function read_groceries(filepath) {
  fs.readFile(filepath, "utf-8", (errors, contents) => {
    let price_database = [];
    for (let line of contents.trim().split("\n")) {
      let [name, price] = line.trim().split(",");
      price_database.push({ name, price });
    }
    console.log(price_database);
  });
}

read_groceries("groceries.txt");
