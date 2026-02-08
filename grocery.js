export class Grocery {
  name;
  price;

  constructor(text_version) {
    let [name, price] = text_version.trim().split(",");
    this.name = name;
    this.price = parseFloat(price);
  }
}
