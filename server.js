const express = require('express')
const app = express()
const path = __dirname + '/public/'
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(express.static('public'))

const dogs = [
   { url: '01' },
   { url: '02' }, { url: '03' },
   { url: '04' }, { url: '05' },
   { url: '06' }, { url: '07' },
   { url: '08' }, { url: '09' },
   { url: '10' }, { url: '11' },
   { url: '12' }, { url: '13' },
   { url: '14' }, { url: '15' },
   { url: '16' }, { url: '17' },
   { url: '18' }, { url: '19' },
   { url: '20' }, { url: '21' },
   { url: '22' }, { url: '23' },
   { url: '24' }, { url: '25' },
   { url: '26' }, { url: '27' },
   { url: '28' }, { url: '29' },
]

const people = [
  { name: "Paul", email: "pb@pb.com", location: "Paris" },
  { name: "Alex", email: "ak@pb.com", location: "Paris" },
  { name: "Maria", email: "mn@pb.com", location: "Paris" },
  { name: "Jonathan", email: "jb@pb.com", location: "Paris" }
]

const pets = [
  { name: "Paul", type: "pb@pb.com", color: "Paris", id: 0 },
  { name: "Alex", type: "ak@pb.com", color: "Paris", id: 1 },
  { name: "Maria", type: "mn@pb.com", color: "Paris", id: 2 },
  { name: "Jonathan", type: "jb@pb.com", color: "Paris", id: 3 }
]

const phones = [
  { brand: "Paul", model: "pb@pb.com", year: "Paris" },
  { brand: "Alex", model: "ak@pb.com", year: "Paris" },
  { brand: "Maria", model: "mn@pb.com", year: "Paris" },
  { brand: "Jonathan", model: "jb@pb.com", year: "Paris" }
]

const rpp = 2

app.get('/getContent', (req, res) => {
   console.log('/getContent')
   const content = getContent(1)
   console.log(`content:`, content)
   setTimeout(() => {
    res.json(content)
  }, 500)
})

app.get('/getPages', (req, res) => {
   const total = dogs.length
   let last = Math.ceil(total / rpp)
   if(last < 1) last = 1
   console.log('/getPages');
   res.json([ { page: 1, last } ])
})

app.post('/getPage', (req, res) => {
   console.log('/getPage');
   console.log(`page`, req.body.page)
   const content = getContent(req.body.page)
   console.log(`content:`, content)
   setTimeout(() => {
    res.json(content)
  }, 500)
})

app.post('/getMore', (req, res) => {
   console.log('/getMore');
//    res.json(contacts)
})

app.get('/getPeople', (req, res) => {
  setTimeout(() => {
    res.json(people)
  }, 500)
})

app.post('/savePeople', (req, res) => {
  console.log(`body`, req.body)
  setTimeout(() => {
    res.json(people)
  }, 500)
})

app.post('/editPeople', (req, res) => {
  console.log(`body`, req.body)
  setTimeout(() => {
    res.json(people)
  }, 500)
})

app.get('/getPets', (req, res) => {
  setTimeout(() => {
    res.json(pets)
  }, 500)
})

app.post('/savePets', (req, res) => {
  console.log(`body`, req.body)
  setTimeout(() => {
    res.json(pets)
  }, 500)
})

app.post('/editPets', (req, res) => {
  console.log(`body`, req.body)
  const newPets = pets.map(pet => {
    if (pet.id === req.body.pets.id) { pet = req.body.pets }
    return pet
  })
  console.log(`newPets`, newPets)
  setTimeout(() => {
    res.json(newPets)
  }, 500)
})

app.get('/getPhones', (req, res) => {
  setTimeout(() => {
    res.json(phones)
  }, 500)
})

app.post('/removePhones', (req, res) => {
  console.log(`gettin here`)
  console.log(`/removePhones`, req.body)
  setTimeout(() => {
    res.json(phones)
  }, 500)
})

app.post('/savePhones', (req, res) => {
  console.log(`body`, req.body)
  setTimeout(() => {
    res.json(phones)
  }, 500)
})

app.post('/editPhones', (req, res) => {
  console.log(`body`, req.body)
  setTimeout(() => {
    res.json(phones)
  }, 500)
})

app.post('/submit', (req, res) => {
  console.log(`/submit`)
  setTimeout(() => {
    res.json({ status: 'ok' })
  }, 500)
})

app.get("*", (req, res) => {
   res.sendFile(process.cwd() + "/public/index.html")
})

app.listen(4000, () => console.log('Server listening on port 4000'))


//----------Functions-----------------------------------------------------------

function getContent(page) {
   let items = []
   const end = page * rpp
   const start = end - rpp
   for (var index = start; index < end; index++) {
      if(dogs[index]) items.push(dogs[index])
   }
   return items
}
