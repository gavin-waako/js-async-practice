import fs from "fs";
import { Grocery } from "./grocery";

let eventual_contents = fs.promises.readFile("groceries.txt", "utf-8");

let eventual_price_database = eventual_contents.then((contents) => {
  let price_database = contents
    .trim()
    .split("\n")
    .map((line) => new Grocery(line));
  return price_database;
});

eventual_price_database.then((database) => {
  console.log(database);
});

let eventual_shopping_list = fs.promises
  .readFile("shopping_list.txt", "utf-8")
  .then((contents) => {
    return contents.split("\n");
  });

let eventual_total_price = Promise.all([
  eventual_price_database,
  eventual_shopping_list,
]).then(([database, desired]) => {
  return desired.reduce((cost_so_far, next_item) => {
    next_item = next_item.trim();
    let correct_grocery = database.find((grocery) => grocery.name == next_item);
    return cost_so_far + correct_grocery.price;
  }, 0);
});

eventual_total_price.then((price) => console.log(price));
