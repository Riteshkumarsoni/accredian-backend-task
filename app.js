const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())
const dbPath = path.join(__dirname, 'mydatabase.db')
let db = null

const initializeDbServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server is listening at port no:- 3000')
    })
  } catch (err) {
    console.log('Some Internal Error Occured' + err.message)
    process.exit(1)
  }
}

initializeDbServer()

app.post('/refer', async (req, res) => {
  const {mobile_no, name, email} = req.body
  const insertQuery = `
    INSERT INTO refer(mobile_no, name, email)
    VALUES(${mobile_no}, '${name}', '${email}')
  `
  await db.run(insertQuery)
  res.send('data created successfully')
})

app.get('/show', async (request, response) => {
  const getdataQuery = `
    SELECT * FROM refer
  `
  const responseData = await db.all(getdataQuery)
  response.send(responseData)
})
