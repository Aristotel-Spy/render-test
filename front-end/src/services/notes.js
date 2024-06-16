import axios from 'axios'

const baseUrl = '/api/notes'
//base url changed to a relative url no matter the server

//this is how we will be able to retrieve from the json server the list of note objects.

const getAll = () => {
  return axios.get(baseUrl)
}

//function that will let us create a new note on the json server
//it's the baseUrl and the newObject (note object.)
const create = newObject => {
  return axios.post(baseUrl, newObject)
}

//function which will be exported that we can input the id and the object
//to update the specific note.
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject) //this is basically ->http://localhost:3001/notes+ /id
  //or http://localhost:3001/notes/id

}

//we export every function 
export default { 
  getAll: getAll, 
  create: create, 
  update: update 
} //basically you export a JavaScript object which has as keys the names of the function.

//also in JavaScript if the keys and the values have the same names you can do this:
//export default { getAll,create,update }

//Note after calling one of those functions in .App.jsx we also need to do this:
// for example getAll().then(response => {}) //so that we can follow up with the response.