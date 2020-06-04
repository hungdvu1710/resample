const express = require('express')
const PORT = 8080
const server = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs').promises
const path = require('path')

const studentData = fs.readFile(path.join(__dirname, 'student_data.txt'), {encoding: 'utf-8'}, (error, data) => {
  if (error) throw error;
  return data.json();
})
const jsonParser = bodyParser.json()
let students

// using studentCounter to set _id is currently creating conflicts

// let studentCounter
async function getStudentData(){
  const result = await studentData.then((data)=>JSON.parse(data))
  console.log(result)
  students = result
  // studentCounter = students.length + 1
  return
}

server.use(cors())
server.use(jsonParser)
getStudentData()

server.post('/student/', (req, res) => {
  getStudentData()
  const student = req.body
  // student._id = studentCounter
  console.log(req.body)
  students.push(student)
  res.send(students)
  const dataToWrite = JSON.stringify(students)

  fs.writeFile('student_data.txt',dataToWrite,(e)=>{
    if (e) throw e
    return
  }).catch(console.log)
})

server.delete('/student/:_id', (req, res) =>{
  getStudentData()
  const _id = Number(req.params._id)
  const student = students.find(student => student._id === _id)
  if (student) {
    const index = students.indexOf(student)
    students.splice(index,1)
    const dataToWrite = JSON.stringify(students)

    fs.writeFile('student_data.txt',dataToWrite,(e)=>{
      if (e) throw e
      return
    }).catch(console.log)

    res.send(students)
    return
  }
  res.sendStatus(404)
})

server.put('/student/:_id', (req, res) =>{
  getStudentData()
  const _id = Number(req.params._id)
  const student = students.find(student => student._id === _id)
  if (student) {
    student.name = req.body.name
    const dataToWrite = JSON.stringify(students)

    fs.writeFile('student_data.txt',dataToWrite,(e)=>{
      if (e) throw e
      return
    }).catch(console.log)

    res.send(students)
    return
  }
  res.sendStatus(404)
})

server.get('/student', (req, res) => {
  getStudentData()
  res.send(students)
})

server.get('/student/:_id', (req, res) => {
  getStudentData()
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
