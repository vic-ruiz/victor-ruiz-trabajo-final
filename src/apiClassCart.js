import fs from "fs";

export default class cartContainer {
  constructor(filePath) {
    this.filePath = __dirname + filePath;
  }

  async findAll() {
    try {
      const carts = await fs.promises.readFile(this.filePath, "utf-8");
      return JSON.parse(carts);
    } catch (error) {
      console.log(`Error Code: ${error.code}`);
    }
  }

  async createCart(){
    try {
        const carts = await this.findAll()
        let id
        let products = {}
        let timestamp = Date.now()
        carts.length === 0 ? id = 1 : id = carts[carts.length-1].id + 1
        carts.push({id,products,timestamp})
        await fs.promises.writeFile(this.filePath,JSON.stringify(carts))
        return id
    } catch (error) {
        console.log(`Error Code: ${error.code}`);
    }
}

async deleteCart(id){
    try {
        const carts = await this.findAll()
        const newCarts = carts.filter(p => p.id !== Number(id))
        await fs.promises.writeFile(this.filePath,JSON.stringify(newCarts))
    } catch (error) {
        console.log(`Error Code: ${error.code}`);
    }
    
}

async findCartById(id){
    try {
        const carts = await this.findAll()
        const selectedCart = carts.find(e => e.id==id)
        return selectedCart
    } catch (error) {
        console.log(`Error Code: ${error.code}`);
    }
}



}
