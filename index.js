const express = require('express')
const PORT = 8080
const server = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const fse = require('fs-extra')

const jsonParser = bodyParser.json()
const students = [
  { _id: 1, name: 'Student #1' },
  { _id: 2, name: 'Student #2' },
  { _id: 3, name: 'Student #3' },
  { _id: 4, name: 'Student #4' },
  { _id: 5, name: 'Student #5' },
]
server.use(cors())
server.use(jsonParser)

server.post('/student/', (req, res) => {
  const student = req.body
  console.log(req.body)
  students.push(student)
  res.send(students)
  fse.writeFile('student_data.txt',students,(e)=>{
    if (e) throw e
    return
  }).catch(console.log)
})

server.delete('/student/:_id', (req, res) =>{
  const _id = Number(req.params._id)
  const student = students.find(student => student._id === _id)
  if (student) {
    const index = students.indexOf(student)
    students.splice(index,1)
    res.send(students)
    return
  }
  res.sendStatus(404)
})

server.put('/student/:_id', (req, res) =>{
  const _id = Number(req.params._id)
  const student = students.find(student => student._id === _id)
  if (student) {
    student.name = req.body.name
    res.send(students)
    return
  }
  res.sendStatus(404)
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
