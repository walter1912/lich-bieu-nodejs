const express = require('express');
const { createTask, getAllTask, getPagaTask, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');

const routes = express.Router()

routes.route('/').post(createTask);
routes.route('/').get(getAllTask);
routes.route('/pages/:pageInt').get(getPagaTask);
routes.route('/:id').get(getTaskById);
routes.route('/:id').put(updateTask);
routes.route('/:id').delete(deleteTask);

module.exports = routes;
