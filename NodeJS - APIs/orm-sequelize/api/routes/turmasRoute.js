const Router = require('express').Router;
const TurmaController = require('../controllers/TurmaController');

const router = Router();

router.get('/turmas', TurmaController.pegarTodasAsTurmas);
router.get('/turmas/:id', TurmaController.pegarUmaTurma);
router.post('/turmas', TurmaController.criaTurma);
router.put('/turmas/:id', TurmaController.atualizaTurma);
router.delete('/turmas/:id', TurmaController.apagaTurma);

module.exports = router;