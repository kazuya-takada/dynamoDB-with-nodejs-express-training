const express = require('express')
const { getCharacters, getCharacterById, addOrUpdateCharacter, deleteCharacter  } = require('./dynamo')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/characters', async (req, res) => {
  try {
    const characters = await getCharacters()
    res.json(characters)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

app.get('/characters/:id', async (req, res) => {
  try {
    const { id } = req.params
    const character = await getCharacterById(id)
    res.json(character)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

app.post('/characters', async (req, res) => {
  const character = req.body
  try {
      const newCharacter = await addOrUpdateCharacter(character)
      res.json(newCharacter)
  } catch (e) {
      console.error(e)
      res.status(500).json({ err: 'Something went wrong' })
  }
});

app.put('/characters/:id', async (req, res) => {
  const character = req.body
  const { id } = req.params
  character.id = id
  try {
      const newCharacter = await addOrUpdateCharacter(character)
      res.json(newCharacter);
  } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Something went wrong' })
  }
});

app.delete('/characters/:id', async(req, res) => {
  const { id } = req.params
  try {
    res.json(await deleteCharacter(id))
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})