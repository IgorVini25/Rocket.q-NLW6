const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')
const AdminController = require('./controllers/AdminController')

const route = express.Router()

// Home Page or Create-pass page
route.get('/', (req, res) => res.render('index', { page: 'enter-room' }))
route.get('/create-pass', (req, res) =>
  res.render('index', { page: 'create-pass' })
)

// Admin Page
route.get('/admin', AdminController.openModal)
route.post('/admin', AdminController.open)

// Admin Actions
route.post('/admin/db-reset', AdminController.dbReset)
route.post('/admin/delete-room/:room', AdminController.deleteRoom)
route.post('/admin/get-room-pass/:room', AdminController.getRoomPass)
route.post(
  '/admin/delete-room-questions/:room',
  AdminController.deleteRoomQuestions
)
route.post('/admin/tables/rooms', AdminController.viewRoomsTable)
route.post('/admin/tables/questions', AdminController.viewQuestionsTable)
route.post('/admin/tables/all', AdminController.viewAllTables)
route.post('/admin/tables/:room', AdminController.viewRoomQuestions)

// Room
route.post('/create-room', RoomController.create)
route.get('/room/:room', RoomController.open)
route.post('/enter-room', RoomController.enter)
route.post('/room/:room/delete-room', RoomController.deleteRoom)

// Questions
route.post('/question/create/:room', QuestionController.create)
route.post('/question/:room/:question/:action', QuestionController.index)

module.exports = route
