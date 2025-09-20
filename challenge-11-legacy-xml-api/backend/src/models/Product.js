class Product {
  constructor(id, name, price, description, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
  }

  static products = [
    new Product(1, 'Widget A', 29.99, 'A high-quality widget for various uses', 'Widgets'),
    new Product(2, 'Gadget B', 49.99, 'An advanced gadget with modern features', 'Gadgets'),
    new Product(3, 'Tool C', 19.99, 'Essential tool for everyday tasks', 'Tools'),
    new Product(4, 'Device D', 99.99, 'Premium device with cutting-edge technology', 'Devices')
  ];

  static findAll() {
    return this.products;
  }

  static findById(id) {
    return this.products.find(p => p.id === parseInt(id));
  }

  static findByCategory(category) {
    return this.products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  static create({ name, price, description, category }) {
    const id = Math.max(...this.products.map(p => p.id)) + 1;
    const product = new Product(id, name, parseFloat(price), description, category);
    this.products.push(product);
    return product;
  }

  static update(id, { name, price, description, category }) {
    const product = this.findById(id);
    if (!product) return null;

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = parseFloat(price);
    if (description !== undefined) product.description = description;
    if (category !== undefined) product.category = category;

    return product;
  }

  static delete(id) {
    const index = this.products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }

  toXml() {
    return {
      product: {
        id: this.id,
        name: this.name,
        price: this.price.toFixed(2),
        description: this.description,
        category: this.category,
        created_at: new Date().toISOString()
      }
    };
  }
}

module.exports = { Product };
