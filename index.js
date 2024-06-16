const express = require('express')
const cors = require('cors')
//import the cors middleware that allows us to connect the 
//front end and back end according to the CORS security protocols
const app = express()


app.use(express.json())

app.use(cors()) //use the middleware here 

//To access the data easily, we need the help of the Express 
//json-parser that we can use with the command app.use(express.json()).
//this is necessary to POST data to our json file on the server.

//creates an express application,the express() is a top level function
//in the express module.

//express instead of http.

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]


  app.get('/', (request, response) => {
    response.send('<h1>Hello World! <3 </h1>')
   
  })


  app.get('/api/notes', (request, response) => {
    
    response.json(notes)
    
  })

 
  app.get('/api/notes/:id',(request,response) =>{

    const ID = Number(request.params.id) //you are getting the :id parameter
    
    const specificNote = notes.find(note=>note.id === ID)
    
    if(!specificNote){
        response.send("ID not found.")
    } else {
        
        response.json(specificNote)//and return it as a jsonObject.

    }
    //app.get() is only for HTTP GET requests.
    //app.delete() is only for HTTP DELETE requests, etc..

  })

  //routing for the DELETE http request:

  app.delete('/api/notes/:id',(request,response)=>{

    const ID = Number(request.params.id)

    //filter the array to not contain the param.
    //we update our Notes array (that's why it is set as let)

    notes = notes.filter(note=>{
        if(note.id!==ID){
            return note
        }
    })

    //then we respond to the DELETE http request with 204
    response.status(204).end()

    
  })

  app.post('/api/notes',(request,response)=>{

    
    const Body = request.body
    

    if (!Body.content) {
        
        return response.status(400).json({ 
          error: 'content missing' 

        }) 
      }

    
      //then we create our Note by the data of the body:

      const note = {
        id:Math.floor(Math.random()*10000),
        content:Body.content, //the content of the body.
        important:Boolean(Body.important) || false 
        //if the important exists you return it,
        //otherwise if it doesn't exist set it as a false default.

      }

    notes.push(note)

    response.json(note) //we respond with the Note as a json object.
    
    

  })
  

  //const PORT = 3001

  //for online deployment it needs to change to this:

  const PORT = process.env.PORT || 3001

  //if environment variable PORT is undefined
  //we use port 3001.
  
//listens the HTTP requests from the port 

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })