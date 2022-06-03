import fs from "fs";

export default class Container {
  constructor(filePath) {
    this.filePath = __dirname + filePath;
  }

  async findAll() {
    try {
      const products = await fs.promises.readFile(this.filePath, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      console.log(`Error Code: ${error.code}`);
    }
  }

  async getById(id) {
    try {
      const data = await this.findAll();
      const result = data.find((product) => product.id === id);
      return result;
    } catch (error) {
      console.log(`Error Code: ${error.code})`);
    }
  }

  async save(product) {
    try {
      let products = await this.findAll();
      if (products === undefined){
          fs.writeFileSync(this.filePath, "[]");
          products = [];
      }
      let id;
      let timestamp = Date.now();
      products.length === 0
        ? (id = 1)
        : (id = products[products.length - 1].id + 1);
      products.push({ ...product, id, timestamp });

      await fs.promises.writeFile(this.filePath, JSON.stringify(products));
      return id;
    } catch (error) {
      console.log(`Error Code: ${error.code})`);
    }
  }

  async updateProduct(product, id) {
    try {
      let products = await this.findAll();
      let index = products.findIndex((prod) => {
        return prod.id == id;
      });
      if (index >= 0) {
        product.id = parseInt(id);
        products[index] = product;
        await fs.promises.writeFile(this.filePath, JSON.stringify(products));
      } else {
        console.log("Product not found");
      }
    } catch (error) {
      console.log(`Error Code: ${error.code})`);
    }
  }

  async deleteById(id){
    try {
        const products = await this.findAll()
        const newProducts = products.filter(p => p.id !== Number(id))
        await fs.promises.writeFile(this.filePath,JSON.stringify(newProducts))
    } catch (error) {
        throw new Error(`Error: ${error}`)
    }
    
}
}
