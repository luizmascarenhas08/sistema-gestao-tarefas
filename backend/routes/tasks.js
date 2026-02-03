const express = require('express');
const cors = require('cors');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/taskController');

// Preflight sem auth (responde com cabeçalhos de CORS)
router.options('/', cors());
router.options('/:id', cors());

// Rotas protegidas
router.post('/', auth, taskController.createTask);
router.get('/', auth, taskController.getTasks);
router.get('/:id', auth, taskController.getTaskById);
router.put('/:id', auth, taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
