
const Note = (props)=>{

    const { note,toggleImportance } = props

    const label = note.important ? 'make not important' : 'make important'
    
    return(
      <li>
         {note.content}
         <button onClick={toggleImportance}> {label}</button>
      </li>
    )
  }

//same way as exporting the App
export default Note

