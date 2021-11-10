const Router = require('express').Router;
const NivelController = require('../controllers/NivelController');

const router = Router();

router.get('/niveis', NivelController.pegarTodosOsNiveis);
router.get('/niveis/:id', NivelController.pegarUmNivel);
router.post('/niveis', NivelController.criaNivel);
router.put('/niveis/:id', NivelController.atualizaNivel);
router.delete('/niveis/:id', NivelController.apagaNivel);

module.exports = router;