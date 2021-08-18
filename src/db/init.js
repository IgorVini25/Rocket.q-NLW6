const Database = require('./config')

const initDb = {
  async init() {
    const db = await Database()

    await db.exec(`CREATE TABLE rooms (
      id INTEGER PRIMARY KEY,
      pass TEXT
    )`)

    await db.exec(`CREATE TABLE questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      read INT,
      room INT
    )`)

    await db.exec(`CREATE TABLE admin (
      adminPassword TEXT
    )`)
	
    // Você pode mudar a sua senha trocando o valor daqui =====┐
    await db.run("INSERT INTO admin (adminPassword) VALUES ('admin')")

    await db.close()
  }
}

initDb.init()
