const express = require('express');
const { createEvent, getAllEvent, getPagaEvent, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');

const routes = express.Router()

routes.route('/').post(createEvent);
routes.route('/').get(getAllEvent);
routes.route('/pages/:pageInt').get(getPagaEvent);
routes.route('/:id').get(getEventById);
routes.route('/:id').put(updateEvent);
routes.route('/:id').delete(deleteEvent);

module.exports = routes;
