import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
you should include them in your data:

*/}

const App = ({ notes }) => {
    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map(note =>
                    <li key={note.id}>
                        {note.content}
                    </li>
                )}
            </ul>
        </div>
    )
}
export default App