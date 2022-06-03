import { Router } from "express";
import CartContainer from '../apiClassCart'
import Container from "../apiClassProducts";
const router = Router()
const cart = new CartContainer("/dataBase/cart.json")
const products = new Container("/dataBase/products.json")


router.get('/:id/productos', async (req,res) => {
    const {id} = req.params
    const product = await cart.findCartById(id)
    res.json(product)
})

router.post('/', async (req,res) => {
    const newCart = await cart.createCart()
    newCart
      ? res.json(newCart)
      : res.json({ error: "Product not found" });
})

router.delete('/:id', async (req,res) => {
    const {id} = req.params
    const cartDeleted = await cart.deleteCart(id)
    res.json(`Cart with ID: ${id} was deleted`)
})

router.post('/:id/productos/:id_prod', async (req,res) => {
    const {id} = req.params
    const {id_prod} = req.params
    const product = await products.getById(parseInt(id_prod))
    const addedProduct = await cart.addProductToCart(parseInt(id),product)
    console.log(addedProduct)
    res.json(addedProduct)
})

router.delete('/:id/productos/:id_prod', async (req,res) => {
    const {id} = req.params
    const {id_prod} = req.params
    const productDeleted = await cart.deleteProductInCart(parseInt(id),parseInt(id_prod))
    res.json("Product in Cart was deleted")
})


module.exports = router;