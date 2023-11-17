// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

const corsOpcoes = {
  //Cliente que fará o acesso
  origin: "http://localhost:3000",

  //Metodos que o cliente pode executar
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}



const crypto = require('./crypto');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

const app = express();
//o cors é como se fosse algo que abrisse uma portinha no servidor para o cliente ter acesso ao conteúdo que tem ali
app.use(cors(corsOpcoes))

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar", "/usuarios/cadastrar"] })
);

app.get('/autenticar', async function(req, res){
  res.render('autenticar')
})

app.get('/usuarios/cadastrar', async function(req, res){
  res.render('usuarios/cadastrar');
  
})

app.post('/usuarios/cadastrar', async function(req, res){
  try {
    const cript = {
      nome: req.body.nome,
      senha: crypto.encrypt(req.body.senha)
    }
    if(req.body.senha == req.body.senhadois){
      const banco = await usuario.create(cript);
      res.redirect('/usuarios/listar')
    }
} catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'As senhas não são iguais!' });
}
})

app.post('/logar', async (req, res) => {
  const u = await usuario.findOne({ where: { nome: req.body.nome, senha: crypto.encrypt(req.body.senha) } });
  if(u) {
    const id = 1;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 3000
    })
    res.cookie('token', token, {httpOnly:true}).json({
      nome: u.nome,
      token: token
    })
    /*/return res.json({
      usuario: req.body.usuario,
      token: token
    }) /*/
  }
   res.status(500).json({ mensagem: "Login Inválido "})
})

app.post('/deslogar', function(req, res) {
  res.cookie('token', null, {httpOnly: true});
  res.json({
    deslogado:true
  })
})

app.get('/usuarios/listar', async function(req, res){
  try {
   var banco = await usuario.findAll();
   res.json(banco);
 } catch (err) {
   console.error(err);
   res.status(500).json({ message: 'Ocorreu um erro ao buscar os usuário.' });
 }
 })

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!')
});