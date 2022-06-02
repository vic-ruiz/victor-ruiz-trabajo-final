import express from 'express'
import morgan from 'morgan'
const app = express();

app.use(express.json())
app.use(morgan('dev'))

const routesProducts = require("./routes/routesProducts");
const routesCart = require("./routes/routesCart");
app.use("/api/productos", routesProducts);
app.use("/api/carrito", routesCart);

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(` 🚀 Server started at http://localhost:${PORT}`);
});

server.on("error", (err) => console.log(err));
