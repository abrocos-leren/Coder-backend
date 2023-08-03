import express from 'express';
import ProductManager from './controllers/productManager.js';
import productRouter from './router/products.routes.js';
import cartRouter from './router/carts.routes.js';
import {engine} from 'express-handlebars'
import __dirname from './utils.js'
import * as path from 'path'


const app = express();
const PORT = 9090;
const product = new ProductManager()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRouter)
app.use('/cart', cartRouter)


//hbs
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve( __dirname + '/views'))


app.use ('/', express.static(__dirname + '/public'))

app.get('/', async (req, res) => {
  let allProducts = await product.getProducts()
  res.render('home', {
    title: "Backend",
    products : allProducts
  })
})

app.get('/:id', async (req, res) => {
  let prod = await product.getProductsById(req.params.id)
  res.render('prod', {
    title: "Backend",
    products : prod
  })
})


const users = [
  {
      name: "Usuario1",
      last_name: "Bot1",
      age: "1",
      phone: "111",
      email: "bot1@mail.com"
  },
  {
      name: "Usuario2",
      last_name: "Bot2",
      age: "2",
      phone: "222",
      email: "bot2@mail.com"
  },
  {
      name: "Usuario3",
      last_name: "Bot3",
      age: "3",
      phone: "3333",
      email: "bot3@mail.com"
  },
  {
      name: "Usuario4",
      last_name: "Bot4",
      age: "4",
      phone: "4444",
      email: "bot4@mail.com"
  }
  ,
  {
      name: "Usuario4",
      last_name: "Bot4",
      age: "4",
      phone: "4444",
      email: "bot4@mail.com"
  }
  ,
  {
      name: "Usuario5",
      last_name: "Bot5",
      age: "5",
      phone: "5555",
      email: "bot5@mail.com"
  }
]


// app.get('/', (req, res) => {

//   res.render('home', {
//     title: 'backend prueba',
//     admin: true,
//     users: users
//   })
// })

app.get('/', async (req, res) => {
  res.render('home', {
    title: 'Entregable backend',
    admin: true,
  })
})



app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

