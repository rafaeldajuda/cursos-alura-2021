const Router = require('express').Router;
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas', PessoaController.pegaTodasAsPessoas);
router.get('/pessoas/ativas', PessoaController.pegaPessoasAtivas);
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa);
router.get('/pessoas/:estudanteId/matriculas', PessoaController.pegaMatriculas);
router.get('/pessoas//matriculas/:turmaId/confirmados', PessoaController.pegaMatriculasPorTurma);
router.get('/pessoas/matriculas/lotadas', PessoaController.pegaTurmasLotadas);
router.get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.pegaUmaMatricula);
router.post('/pessoas', PessoaController.criaPessoa);
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa);
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa);
router.post('/pessoas/:estudanteId/matriculas/', PessoaController.criaMatricula);
router.post('/pessoas/:estudanteId/matriculas/:matriculaId/restaura', PessoaController.restauraMatricula);
router.put('/pessoas/:id', PessoaController.atualizaPessoa);
router.put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizaMatricula);
router.delete('/pessoas/:id', PessoaController.apagaPessoa);
router.delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.apagaMatricula);

module.exports = router;