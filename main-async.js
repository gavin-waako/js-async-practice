import { Grocery, calculate_total_price } from "./grocery";
import { promises as promfs } from "fs";

let grocery_text = await promfs.readFile("groceries.txt", "utf-8");
let shopping_list_text = await promfs.readFile("shopping_list.txt", "utf-8");

let price_database = grocery_text.split("\n").map((line) => new Grocery(line));
let shopping_list = shopping_list_text.split("\n");

let total_price = calculate_total_price(shopping_list, price_database);
console.log(total_price);
