const express = require('express')

const PORT = 8080
const server = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const students = [
  { _id: 1, name: 'Student #1' },
  { _id: 2, name: 'Student #2' },
  { _id: 3, name: 'Student #3' },
  { _id: 4, name: 'Student #4' },
  { _id: 5, name: 'Student #5' },
]
server.post('/student/', jsonParser, (req, res) => {
  const name = req.body.name
  const student = {name: name}
  students.push(student)
  res.send(students)
})
server.get('/',(req,res) =>{
  res.send("testing")
})
server.get('/student', (req, res) => {
  res.send(students)
})
server.get('/student/:_id', (req, res) => {
  const _id = Number(req.params._id)

  const student = students.find(student => student._id === _id)

  if (student) {
    res.send(student)
    return
  }

  res.sendStatus(404)
})

server.listen(PORT, () => {
  console.info(`Server started at http://localhost:${PORT}`)
})
