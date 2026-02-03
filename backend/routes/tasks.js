const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/taskController');

// Preflight para /api/tasks
router.options('/', (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://sistema-gestao-tarefas-one.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Authorization,Content-Type");
  return res.sendStatus(200);
});

// Preflight para /api/tasks/:id
router.options('/:id', (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://sistema-gestao-tarefas-one.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Authorization,Content-Type");
  return res.sendStatus(200);
});

// Rotas protegidas
router.post('/', auth, taskController.createTask);
router.get('/', auth, taskController.getTasks);
router.get('/:id', auth, taskController.getTaskById);
router.put('/:id', auth, taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
