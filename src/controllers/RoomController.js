const { open } = require('sqlite')
const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await Database()
    const pass = req.body.password
    let roomId
    let isRoom = true

    while (isRoom) {
      for (var i = 0; i < 6; i++) {
        i == 0
          ? (roomId = Math.floor(Math.random() * 10).toString())
          : (roomId += Math.floor(Math.random() * 10).toString())
      }

      const roomsExistIds = await db.all(`SELECT id FROM rooms`)
      isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)

      if (!isRoom) {
        await db.run(`INSERT INTO rooms (
            id,
            pass
          ) VALUES (
            ${parseInt(roomId)},
            "${pass}"
          )`)
      }
    }

    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  async open(req, res) {
    const db = await Database()
    const roomId = req.params.room
    const roomExist = await db.get(`SELECT id FROM rooms WHERE id = ${roomId}`)
    if (roomExist == undefined) {
      res.render('room-dont-exist', { roomId: roomId })
    } else {
      // Carrega a página
      const questions = await db.all(
        `SELECT * FROM questions WHERE room = ${roomId} and read = 0`
      )
      const questionsRead = await db.all(
        `SELECT * FROM questions WHERE room = ${roomId} and read = 1`
      )
      let isNoQuestion

      if (questions.length == 0 && questionsRead == 0) {
        isNoQuestion = true
      }

      res.render('room', {
        roomId: roomId,
        questions: questions,
        questionsRead: questionsRead,
        isNoQuestion: isNoQuestion
      })
    }
  },

  enter(req, res) {
    const roomId = req.body.roomId

    res.redirect(`/room/${roomId}`)
  },

  async deleteRoom(req, res) {
    const db = await Database()
    const pass = req.body.password
    const roomId = req.params.room

    const room = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
    if (room.pass == pass) {
      await db.run(`DELETE FROM rooms WHERE id = ${roomId}`)
      await db.run(`DELETE FROM questions WHERE room = ${roomId}`)
      res.redirect('/')
    } else {
      res.render('parts/passincorrect', { roomId: '/room/' + roomId })
    }
  }
}
