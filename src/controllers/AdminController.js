const { reset } = require('nodemon')
const Database = require('../db/config')
let adminLogged = false

module.exports = {
  // Load Admin Page

  // Open Modal to Admin Login
  openModal(req, res) {
    if (adminLogged) {
      res.render('admin')
    } else {
      res.render('parts/modal')
    }
  },
  // Verify password and render admin Page
  async open(req, res) {
    const db = await Database()
    const pass = req.body.password
    const AdminPass = await db.get(`SELECT * FROM admin`)
    if (AdminPass.adminPassword == pass) {
      res.render('admin')
      adminLogged = true
    } else {
      adminLogged = false
      res.render('parts/passincorrect', { roomId: '/admin' })
    }
  },

  // Database Actions
  // Reset Database
  async dbReset(req, res) {
    const db = await Database()
    const pass = req.body.password
    const AdminPass = await db.get(`SELECT * FROM admin`)
    if (AdminPass.adminPassword == pass) {
      await db.run('DELETE FROM rooms')
      await db.run('DELETE FROM questions')
      res.redirect('parts/alert-message', {
        message: 'Banco de Dados Restaurado',
        redirect: '/admin'
      })
    } else {
      adminLogged = false
      res.render('parts/passincorrect', { roomId: '/admin' })
    }
  },
  // View Database Table 'rooms'
  async viewRoomsTable(req, res) {
    const db = await Database()
    const pass = req.body.password
    const adminPassword = await db.get('SELECT * FROM admin')
    if (adminPassword.adminPassword == pass) {
      const rooms = await db.all('SELECT * FROM rooms')
      res.render('table', { dataTable: rooms, tableType: 'rooms' })
    } else {
      adminLogged = false
      res.render('parts/passincorrect', { roomId: '/admin' })
    }
  },
  // View Database Table 'questions'
  async viewQuestionsTable(req, res) {
    const db = await Database()
    const pass = req.body.password
    const adminPassword = await db.get('SELECT * FROM admin')
    if (adminPassword.adminPassword == pass) {
      const questions = await db.all('SELECT * FROM questions')
      res.render('table', { dataTable: questions, tableType: 'questions' })
    } else {
      adminLogged = false
      res.render('parts/passincorrect', { roomId: '/admin' })
    }
  },
  // View all Database Table
  async viewAllTables(req, res) {
    const db = await Database()
    const pass = req.body.password
    const adminPassword = await db.get('SELECT * FROM admin')
    if (adminPassword.adminPassword == pass) {
      const rooms = await db.all('SELECT * FROM rooms')
      const questions = await db.all('SELECT * FROM questions')
      res.render('table', {
        roomsTable: rooms,
        questionsTable: questions,
        tableType: 'all'
      })
    } else {
      adminLogged = false
      res.render('parts/passincorrect', { roomId: '/admin' })
    }
  },

  // Rooms Actions
  // Delete room requested by Admin
  async deleteRoom(req, res) {
    const db = await Database()
    const AdminRoomId = req.params.room
    const pass = req.body.password
    const adminPassword = await db.get(`SELECT * FROM admin`)
    const roomExist = await db.get(
      `SELECT id FROM rooms WHERE id = ${AdminRoomId}`
    )
    if (adminPassword.adminPassword == pass) {
      if (roomExist == undefined) {
        res.render('parts/alert-message', {
          message: `A sala ${AdminRoomId} não existe no Banco de Dados`,
          redirect: '/admin'
        })
      } else {
        await db.run(`DELETE FROM rooms WHERE id = ${AdminRoomId}`)
        await db.run(`DELETE FROM questions WHERE room = ${AdminRoomId}`)
        res.render('parts/alert-message', {
          message: `A sala ${AdminRoomId} foi excluída`,
          redirect: '/admin'
        })
      }
    } else {
      adminLogged = false
      res.render('parts/passincorrect', { roomId: '/admin' })
    }
  },
  // Return the room Pass requested by Admin
  async getRoomPass(req, res) {
    const db = await Database()
    const pass = req.body.password
    const AdminRoomId = req.params.room
    const AdminPass = await db.get(`SELECT * FROM admin`)
    if (AdminPass.adminPassword == pass) {
      const RoomPassRequestByAdmin = await db.get(
        `SELECT pass FROM rooms WHERE id = ${AdminRoomId}`
      )
      if (RoomPassRequestByAdmin == undefined) {
        res.render('parts/alert-message', {
          message: `A sala ${AdminRoomId} não existe no Banco de Dados`,
          redirect: '/admin'
        })
      } else {
        res.render('parts/alert-message', {
          message: `Senha da sala ${AdminRoomId} é: ${RoomPassRequestByAdmin.pass}`,
          redirect: '/admin'
        })
      }
    } else {
      adminLogged = false
      res.render('parts/passincorrect', { roomId: '/admin' })
    }
  },
  // Delete the question of room requested by Admin
  async deleteRoomQuestions(req, res) {
    const db = await Database()
    const roomId = req.params.room
    const pass = req.body.password
    const adminPassword = await db.get('SELECT * FROM admin')
    const roomExist = await db.get(`SELECT id FROM rooms WHERE id = ${roomId}`)
    if (adminPassword.adminPassword == pass) {
      if (roomExist == undefined) {
        res.render('parts/alert-message', {
          message: `A sala ${roomId} não existe no Banco de Dados`,
          redirect: '/admin'
        })
      } else {
        await db.run(`DELETE FROM questions WHERE room = ${roomId}`)
        res.render('parts/alert-message', {
          message: `Todas questões da sala ${roomId} foram Excluídas`,
          redirect: '/admin'
        })
      }
    }
  },
  // View questions table of room
  async viewRoomQuestions(req, res) {
    const db = await Database()
    const roomId = req.params.room
    const pass = req.body.password
    const adminPassword = await db.get('SELECT * FROM admin')
    const roomExist = await db.get(`SELECT id FROM rooms WHERE id = ${roomId}`)
    if (adminPassword.adminPassword == pass) {
      if (roomExist == undefined) {
        res.render('parts/alert-message', {
          message: `A sala ${roomId} não existe no Banco de Dados`,
          redirect: '/admin'
        })
      } else {
        const questions = await db.all(
          `SELECT * FROM questions WHERE room = ${roomId}`
        )
        res.render('table', { dataTable: questions, tableType: 'questions' })
      }
    }
  }
}
