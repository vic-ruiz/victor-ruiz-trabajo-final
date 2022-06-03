import { Router } from "express";
import CartContainer from '../apiClassCart'
const router = Router()
const cart = new CartContainer("/dataBase/cart.json")


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


module.exports = router;