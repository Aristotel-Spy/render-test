import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import axios from 'axios' //we don't really need this here since we are going to pass
//the fetching of data inside the App component,however I'll keep it here aswell as a reminder.

//.get() gets the json file from the json server

//axios.get('http://localhost:3001/notes').then(response => {
//  const notes = response.data
//  console.log("The data of the response, the list of notes:",notes) //the response data printed
//  console.log("The whole response object:",response) //printing the whole response object.
//})

//The response object contains all the essential data related to the response of an HTTP GET request,
//which would include the returned data, status code, and headers.
//the response.data is basically a key of the response object,which contains the data of the json
//file and we save that into the notes variable.

//const promise2 = axios.get('http://localhost:3001/foobar') <-This was to test when it fails.
//console.log(promise2) 

//instead we are going to use the axios.get() method inside the App component
//therefore the App component doesn't need a prop passed to it :

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)