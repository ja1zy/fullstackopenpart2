import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'


import Note from './component/Note'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        noteService
            .getAll()
            .then(response => {
                setNotes(response.data)
            })
    }, [])





    //Individual notes stored in the json-server backend can be modified in two different ways
    // by making HTTP requests to the note's unique URL.
    // We can either replace the entire note with an HTTP PUT request
    // or only change some of the note's properties with an HTTP PATCH request.

    //Almost every line of code in the function body contains important details.
    // The first line defines the unique URL for each note resource based on its id.
    // The array find method is used to find the note we want to modify,
    // and we then assign it to the note variable.
    // After this, we create a new object that is an exact copy of the old note,
    // apart from the important property that has the value flipped (from true to false or from false to true).
    //

    const toggleImportanceOf = id => {
        const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n => n.id === id)
        //in practice, { ...note } creates a new object with copies of all the properties from the note object.
            const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(response => {
                setNotes(notes.map(note => note.id === id ? response.data : note))
            }).catch(error => {
            alert(
                `the note '${note.content}' was already deleted from server`
            )
            setNotes(notes.filter(n => n.id !== id))
        })

       // axios.put(url, changedNote).then(response => {
         //   setNotes(notes.map(note => note.id === id ? response.data : note))})
    }
//The map method creates a new array by mapping every item from the old array into an item in the new array.



    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() > 0.5,
        }

        //axios.post('http://localhost:3001/notes', noteObject).then((response) => {
         //   setNotes(notes.concat(response.data))
         //   setNewNote('')
       // })
        noteService
            .create(noteObject)
            .then(response => {
                setNotes(notes.concat(response.data))
                setNewNote('')
            })
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const notesToShow = showAll ? notes : notes.filter((note) => note.important)

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map((note) => (
                    <Note key={note.id} note={note}
                          toggleImportance={() => toggleImportanceOf(note.id)}

                    />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App