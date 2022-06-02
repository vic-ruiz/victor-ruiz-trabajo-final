import { Router } from "express";
import Container from '../apiClassProducts'
const router = Router()
const container = new Container("/dataBase/products.json")

const isAdmin = true

function userStatus(req,res,next){
    if(!isAdmin){
        res.send("No tienes acceso a esta ruta")
    } else {
        next()
    }
}

router.get('/', async(req,res)=>{
    const products = await container.findAll()
    console.log(container.filePath)
    res.json(products)
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const product = await container.getById(parseInt(id));
  
    product
      ? res.status(200).json(product)
      : res.status(404).json({ error: "Product not found" });
  });

  router.post("/",userStatus, async (req, res) => {
    const { body } = req;
    await container.save(body);
    res.json({message: 'Producto guardado', producto: body});
  });

  router.delete('/:id',userStatus, async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await container.deleteById(id);
    res.json({message: `Product with ID: ${id} was deleted`});
  })

  router.put('/:id',userStatus, async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    const product = container.getById(parseInt(id));
    product 
    ? container.updateProduct(body,id)
    : res.json({message: `Product with ID: ${id} was not found`});
    res.json({message: `Product Updated`, producto: body})
  })


module.exports = router;