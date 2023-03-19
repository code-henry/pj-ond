import axios from 'axios';
const getChatGPT = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const json = await response.json()
  console.log(json)
  return json
}

export {getChatGPT}