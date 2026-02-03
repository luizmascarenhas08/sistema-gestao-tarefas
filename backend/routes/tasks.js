const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/taskController');

// Responde ao preflight sem exigir token
router.options('/', (req, res) => {
  res.sendStatus(200);
});
router.options('/:id', (req, res) => {
  res.sendStatus(200);
});

// Rotas protegidas
router.post('/', auth, taskController.createTask);
router.get('/', auth, taskController.getTasks);
router.get('/:id', auth, taskController.getTaskById);
router.put('/:id', auth, taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
