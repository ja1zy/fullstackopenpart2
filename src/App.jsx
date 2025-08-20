import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Note from './components/Note'





{/*
JSX elements directly inside a map() call always need keys!
Keys tell React which array item each component corresponds to,
 so that it can match them up later.
 This becomes important if your array items can move
 (e.g. due to sorting), get inserted, or get deleted.
 A well-chosen key helps React infer what exactly has happened,
 and make the correct updates to the DOM tree.
Rather than generating keys on the fly,
you should include them in your data:*/}

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState(
        'a new note...'
    )
    const [showAll, setShowAll] = useState(true)




    //notes on use effect

    //This is printed to the console:
    //
    // render 0 notes
    // effect
    // promise fulfilled
    // render 3 notes

    //first, the body of the function defining the component is executed and the component is rendered for the first time.
    // At this point render 0 notes is printed, meaning data hasn't been fetched from the server yet.

    const hook = () => {
        console.log('effect')
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                console.log('promise fulfilled')
                setNotes(response.data)
            })
    }
    useEffect(hook, [])
    console.log('render', notes.length, 'notes')

   // the command axios.get initiates the fetching of data from the server
    // as well as registers the following function as an event handler for the operation:
//response => {
//   console.log('promise fulfilled')
//   setNotes(response.data)
// })
//hen data arrives from the server, the JavaScript runtime calls the function registered as the event handler,
// which prints promise fulfilled to the console and stores the notes received from the server
// into the state using the function setNotes(response.data).
// As always, a call to a state-updating function triggers the re-rendering of the component.
// As a result, render 3 notes is printed to the console,
// and the notes fetched from the server are rendered to the screen.
// Finally, let's take a look at the definition of the effect hook as a whole:
    //Now we can see more clearly that the function useEffect takes two parameters. The first is a function,
    // the effect itself. According to the documentation:
    // By default, effects run after every completed render,
    // but you can choose to fire it only when certain values have changed.
    //
    // So by default, the effect is always run after the component has been rendered.
    // In our case, however, we only want to execute the effect along with the first render.
    //
    // The second parameter of useEffect is used to specify how often the effect is run.
    // If the second parameter is an empty array [],
    // then the effect is only run along with the first render of the component.

    const handleNoteChange = (event) => {
        console.log("type: ",event.type)
        console.log('yo',event.target.value)
        setNewNote(event.target.value)
    }



    /* The event parameter is the event that triggers the call to the event handler function:
    The event handler immediately calls the event.preventDefault() method,
    which prevents the default action of submitting a form. The default action would,
    among other things, cause the page to reload.
     The target in this case is the form that we have defined in our component.
     */
    /*
    First, we create a new object for the note called noteObject that will receive its content
    from the component's newNote state.
    The unique identifier id is generated based on the total number of notes.
    This method works for our application since notes are never deleted.
    With the help of the Math.random() function, our note has a 50% chance of being marked as important.
     */

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: String(notes.length + 1),
        }
        //use concat to create an entirely new object!



        axios
            .post('http://localhost:3001/notes', noteObject)
            .then(response => {
                setNotes(notes.concat(response.data))
                setNewNote('')
            })
        //new notes is reset to be empty!

    }


    //Let's change the component so that it stores a list of all the notes to be displayed in the notesToShow variable.
    // The items on the list depend on the state of the component:
    //note: filter method filters the variables based on
    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)













    // in the return statement We have added the addNote function as an event handler to the form element
    // that will be called when the form is submitted, by clicking the submit button.
    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>


            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} />
                )}
            </ul>
            <form onSubmit={addNote}>
                {/**/}
                <input value={newNote}  onChange={handleNoteChange}  />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

//How do we access the data contained in the form's input element?
//controlled components!!!!!



export default App