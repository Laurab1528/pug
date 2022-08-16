const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', './views');

let productsHC = [
  { id: 1, title: 'nike ball', price: 101, thumbnail: 'http://localhost:8080/public/nike-ball.jpg' },
  { id: 2, title: 'nike shoes', price: 102, thumbnail: 'http://localhost:8080/public/nike-shoes.jpg' },
  { id: 3, title: 'adidas shoes', price: 102, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
];

app.get('/hello', (req, res) => {
  res.render('hello.pug', { msg: 'un msg del perrito' });
});

app.get('/products', (req, res) => {
  res.render('products.pug', { title: 'listado de perros', products: productsHC });
});

app.get('/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const found = productsHC.find((element) => element.id == id);
    if (found) {
      res.render('product.pug', { product: found, title: 'listado de productos' });
    } else {
      res.render('errorNotFound', { error: 'No se encontro el producto' });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get('/form', (req, res) => {
  res.render('formulario', { title: 'Ingrese su producto' });
});

app.post('/products', (req, res) => {
  const { body } = req;
  console.log(body);
  res.end('fin');
});