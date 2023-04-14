const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

// Database
connection.authenticate()
  .catch((err) => {
    console.log(err)
  });

// Configurando Express para utilizar EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas
app.get("/", (req, resp) => {
  Pergunta.findAll({ raw: true, order: [
    ['id', 'DESC']
  ] }).then(res => {
    console.log(res);
    resp.render("index", {
      perguntas: res
    });
  });
});

app.get("/perguntar", (req, resp) => {
  resp.render("perguntar");
});

app.get("/pergunta/:id", (req, resp) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: {
      id: id
    }
  }).then(pergunta => {
    if (pergunta != undefined){
      Resposta.findAll({
        raw: true,
        where: {
          perguntaId: pergunta.id
        }, order: [
          ['id', 'DESC']
        ]
      }).then(resposta => {
        resp.render("pergunta", {
          pergunta: pergunta,
          resposta: resposta
        });
      })
    } else {
      resp.render("404");
    }
  });
});

app.post("/salvarpergunta", (req, resp) => {
  var title = req.body.title;
  var description = req.body.description;

  Pergunta.create({
    titulo: title,
    descricao: description
  }).then(() => {
    resp.redirect("/");
  });
});

app.post("/responder", (req, resp) => {
  var corpo = req.body.corpo;
  var idPergunta = req.body.idPergunta;

  Resposta.create({
    corpo: corpo,
    perguntaId: idPergunta
  })
  .then(() => {
    resp.redirect(`/pergunta/${idPergunta}`);
  })
  .catch((err) => console.log(err));
});

app.listen(3000, () => {
});