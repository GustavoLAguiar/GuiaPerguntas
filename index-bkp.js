const express = require('express');
const app = express();

// Configurando Express para utilizar EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/:nome/:lang', (res, resp) => {
  var nome = res.params.nome;
  var lang = res.params.lang;
  var showMessage = false;

  var produtos = [
    {nome: 'Doritos', preco: 3.14},
    {nome: 'Coca cola', preco: 6},
    {nome: 'Chocolate', preco: 4.79},
    {nome: 'Sabonete', preco: 3.99}
  ]
  
  resp.render("index", {
    nome: nome,
    lang: lang,
    empresa: 'Guia do programador',
    inscritos: 10000,
    msg: showMessage,
    produtos: produtos
  });
});

app.listen(9090, () => {
  console.log('Online');
});