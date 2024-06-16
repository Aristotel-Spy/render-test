import Note from './components/Note'
import { useState,useEffect } from 'react' //also importing the useEffect.
//import axios from 'axios' //importing axios here to fetch data from the json server.
import noteService from './services/notes'



//Note component can be found in the components file!!!

//the . in the beginning means that it is in the current directory (src) /components is the 
//subdirectory and /Note is the file (.jsx) can be ommited.

//when making Note as a component: 
//Note that the key attribute 
//must now be defined for the Note components, and not for the li tags like before.



const App = (props) => {

  //in this case we pass an empty array for now at the notes useState
  const [notes,setNotes] = useState([])

  const [newNote, setNewNote] = useState( //useState for new notes.
    'a new note...'
  )
  
  const [showAll, setShowAll] =useState(true)//useState to define whether we want to show all
  //notes or not. if this is set to false, we will make it so that we only show the notes that are
  //labeled as important.

  //the useEffect hook, which here we are fetching the data from the json server,
  //and we are setting at notes by using the setNotes() functions the data or basically the list
  //of object notes.

  //this is the HTTP GET

  const hook = () => { 
    
      noteService.getAll().then(response =>{

        setNotes(response.data)
      })

  }

  //When data arrives from the server, the JavaScript runtime calls the function registered as the event handler,
  // which prints promise fulfilled to the console and stores the notes received from the server 
  //into the state using the function setNotes(response.data).
 //As always, a call to a state-updating function(useEffect) triggers the re-rendering of the component.
 // As a result, render 3 notes is printed to the console, 
 //and the notes fetched from the server are rendered to the screen.

  console.log('render', notes.length, 'notes') //we are printing the length of the notes array.

  //we change the useEffect to put it into a variable hook and then call the useEffect() function:

  //this function is executed immidiately after rendering the component

  useEffect(hook, [])
  //of the app component.
  //the useEffect function takes 2 parameters.
  //the first is the hook,which is the function where we use axios to get our data from the json server.
  //also known as the effect which is always run by default when the component (App) gets re-rendered.

  //and the second parameter defines how often the effect in our case (hook) is run.
  //when it is set to an empty array it means it is only run once after the re-rendering of the component.



  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    //alert("Button on form clicked!") <-alert from the website.

    //in this version we don't set an id we let the json server take care of it.

    const newObjectNote = {content:newNote,important:Math.random() < 0.5}
    // if math.random which produces a float from 0 to 1, is greater than 0.5 it will be set to true
    //otherwise to false.

    //we use the HTTP POST HERE
    noteService.create(newObjectNote).then(response =>{
      
      setNotes(notes.concat(response.data)) //concat to the list of the notes
      //the response.data which is the data we sent on the server using POST
      //this will update on our browser the notes.
    })


    setNewNote('') //reset the note at the submit form.

    //THE BELOW CODE ISN"T USED IN THIS VERSION SINCE WE RETRIEVE THE NOTES FROM THE JSON SERVER
    //AND WE HAVE IMPLEMENTED A WAY TO SEND NOTES TO THE SERVER,THEREFORE SENDING THEM THERE
    //MEANS THAT WE DON"T NEED TO DO STORE THEM IN THE LIST BY USING .concat() HERE ANYMORE!

    //concat will return a new list with a new reference containing the elements / note objects
    //of the previous list, plus the new note object. //functional programming way
    //it doesn't mutate the list like .push() it creates a new one instead with a new address.
    //setNotes(notes.concat(newObjectNote))
    //setNewNote('') //reset the note at the submit form.
  }

  //event handler for the onChange attribute,everytime you type something on the form window,
  //or delete something, this function updates the note.

  //the event parameter is the event that happens when the onChange gets triggered,
  //basically a change in the text of the window of the form.

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value) //event.target.value gives us the value of the event
    //basically what we write or delete from the form window.
  }

  //conditional operator:

  const notesToShow = showAll ? notes : notes.filter(note=>note.important)

  //toggle importance hook

  const toggleImportanceOf = (id) => {
    console.log('importance of ' + id + ' needs to be toggled')

    //const url = `http://localhost:3001/notes/${id}`//that is going to be the url
    //with the id concatanated so that we can modify the specific note object.

    const note = notes.find(n => n.id === id)//this is a simple and good method
    //for arrays that you can find a specific element of the array without having to do
    //a for loop for example this replaces the for(const element of notes){if element.id===id}...
    //it returns the element found.

    const changedNote = { ...note, important: !note.important }
    //this is a new Note object the ...note means that every other element than important of the note
    //will be added with the same attributes, and the important attribute will be changed to the
    //opposite of the current importance = !note.important
    //this note object will have a different address /reference! important for react!

    //WARNING: changedNote is a shallow copy of note with a modified attribute, it does indeed
    //have a different reference, however if the note itself contained other objects
    //the objects inside the shallow copy (changedNote) would still be pointing to the previous one
    //this is similar to python where you need to do something like this: copy.deepcopy()!

    //Individual notes stored in the json-server backend can be modified in two different ways
    // by making HTTP requests to the note's unique URL.

    // We can either replace the entire note with an HTTP PUT request
    // or only change some of the note's properties with an HTTP PATCH request.
    //so we are going to use HTTP PUT to completely replace the note,the note is found at 
    //the url above which takes /notes/id to go to that specific note.

    //after modifying it on the json server you will need to change your notes array in
    //front end aswell

    noteService.update(id,changedNote).then(response =>{

      setNotes(notes.map(note=>{

        if(note.id === response.data.id){ //if the id of the note on the list is the same
          //as the one from the response, which is basically the one you sent to modify
          //return the response.data to the new list created by map
          return response.data
        } else { //otherwise if it is not the same one, just return it the way it is on the 
          //new list created by map.
          return note
        }

      }))
      //so at setNotes you are returning a new list with the old note objects intact
      //but the one object that was to be modified of importance, on the new list 
      //the modified object will be returned.

    })



  }

  //if you want your hook to get a parameter that you set at the html part you must pass it like this:
  //toggleImportance={() => toggleImportanceOf(note.id)}
  //you need to pass it as an arrow function first, and then at that arrow function you put your hook
  //with a parameter.


  //that statement above works like this:

  //const result = condition ? val1 : val2

  //basically the result variable will be set to 'val1' if 'condition' is true
  //otherwise result will be set to 'val2'.
  //therefore if showAll is set to true, our notesToShow variable will be equal to our notes list
  //otherwise it will be equal to our filtered notes list which filters depending on the important element.

  //event handler to show only important or all

  const setShowImp = () =>{

    setShowAll(!showAll)
  }


  //you create a form by using <form></form>
  //the onSubmit prop off the <form></form> basically is when you submit the form.


  //the <input/> attribute of the form element has 2 child attributes in this case:
  //value, which is basically the value set at the form,
  //and the onChange, which basically is like an attribute that takes as an input
  //and event handler function,similar to the buttons onClick attribute or the
  //the onChange gets activated everytime you change the value attribute,for example
  //by writing something on the form, or deleting something.
  //that calls the handleNoteChange eventHandler which in turn modifies the newNote variable. 
  //forms onSubmit element. the attributes that start with onSomething, take event handler functions.
  //
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note=>
        <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}> 
        <input 
        value={newNote}
        onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <br></br>
      <button onClick={setShowImp}>
        Show {showAll ? "Important" : "All"}
      </button>
    </div>
  )
}


export default App
