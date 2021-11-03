const Router = require('express').Router;
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas', PessoaController.pegarTodasAsPessoas);

module.exports = router;