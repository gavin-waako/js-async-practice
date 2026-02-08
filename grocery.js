export class Grocery {
  name;
  price;

  constructor(text_version) {
    let [name, price] = text_version.trim().split(",");
    this.name = name;
    this.price = parseFloat(price);
  }
}

export function calculate_total_price(shopping_list, price_database) {
  return shopping_list.reduce((cost_so_far, next_item) => {
    next_item = next_item.trim();
    let correct_grocery = price_database.find(
      (grocery) => grocery.name == next_item,
    );
    return cost_so_far + correct_grocery.price;
  }, 0);
}
