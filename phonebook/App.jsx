import {useEffect, useState} from 'react'

import axios from 'axios'

const Filter = (props)=>{

    return (<form>
        <div>
            Filter shown with <input
            value={props.newValue}
            onChange={props.handleFilter}

        />
        </div>
    </form>)
}
const PersonForm =(props)=>{
    return (
        <form>
            <div>
                name: <input
                value={props.newName}
                onChange={props.handleNewName}
            />
            </div>
            <div>
                number: <input
                value={props.newNumber}
                onChange={props.handleNewNumber}
            />
            </div>
            <div>
                <button type="submit" onClick={props.addNewNames}>add</button>
            </div>
        </form>
    )
}

const Persons=({showNotes})=>{


    return(showNotes.map(person=> <li>{person.name}  {person.number}</li>)
    )



}




const App = () => {


    const [persons, setPersons] = useState([])
    //hook grabs data from teh database and stores it into the persons array!
    const hook = () => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }
    useEffect(hook, [])
    console.log('render', persons.length, 'notes')

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setFilter]=useState('')



    const handleNewName =(event)=>{
        console.log(event.target.value)
        setNewName(event.target.value)
       // setPersons(persons.concat(newName))
        //setNewName('')
    }
    const handleNewNumber =(event)=>{
        console.log(event.target.value)
        setNewNumber(event.target.value)
        // setPersons(persons.concat(newName))
        //setNewName('')
    }
    const handleFilter= (event)=>{
        console.log(event.target.value)
        setFilter(event.target.value)
    }


    const addNewNames=(event)=>{
        event.preventDefault()
        const personPObj = {
            name:newName,
            number:newNumber,
            id:String(persons.length+1)
        }

        if(persons.find((obj)=>obj.name===newName)){
            alert(newName+' is already added to phonebook')
            setNewName('')
            setNewNumber('')
            return
        }
        setPersons(persons.concat(personPObj))
        setNewName('')
        setNewNumber('')
    }
    const showNotes=newFilter===''?
        persons:persons.filter(person=> person.name.toLowerCase().includes(newFilter.toLowerCase())===true)





    return (
        <div>
            <h2>Filter</h2>
            <Filter newFilter={newFilter}  handleFilter={handleFilter}/>


            <h2>Add a new</h2>
            <PersonForm newName={newName} handleNewName={handleNewName}
                newNumber={newNumber}  handleNewNumber={handleNewNumber}
                        addNewNames={addNewNames}
            />

            <h2>Numbers</h2>
            <Persons showNotes={showNotes}/>
        </div>
    )
}

export default App