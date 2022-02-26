const axios = require('axios')
const { addOrUpdateCharacter  } = require('./dynamo')

const seedDate = async () => {
  const url = 'http://hp-api.herokuapp.com/api/characters'
  try {
    const { data : characters } = await axios.get(url)

    const characterPromises = characters.map((character, index) => 
      addOrUpdateCharacter({ ...character, id: index + '' })
    )
    await Promise.all(characterPromises)
  } catch (e) {
    console.error(e)
  }
}

seedDate()

