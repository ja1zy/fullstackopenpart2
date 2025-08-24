import {useEffect, useState} from 'react'
import personService from './services/persons.js'
import Notification from "./components/Notification.jsx";


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
                {<button type="submit" onClick={props.addNewNames}>add</button>}
            </div>
        </form>
    )
}

const Persons=({showNotes,delEntry})=>{
   // <div>
     //   {personsToShow.map(person => <p key={person.name}>{person.name} {person.number} <button type="button" onClick={() => handleDelete(person)}>Delete</button></p>)}
   // </div>


    return(

        <div>
            {showNotes.map(person=>
                <p key={person.id}>{person.name} {person.number} <button type="button" onClick={() => delEntry(person)}>Delete</button></p>

        )}
        </div>
    )



}




const App = () => {


    const [persons, setPersons] = useState([])
    //hook grabs data from teh database and stores it into the services array!
    const hook = () => {
        console.log('effect')

        personService.getAll()
            .then(respObj => {
                console.log('promise fulfilled')
                setPersons(respObj)
            })
    }
    useEffect(hook, [])
    console.log('render', persons.length, 'notes')

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setFilter]=useState('')
    const[addedMessage, setAddedMessage]=useState(null)


    const handleNewName =(event)=>{
        console.log(event.target.value)
        setNewName(event.target.value)
       // setPersons(services.concat(newName))
        //setNewName('')
    }
    const handleNewNumber =(event)=>{
        console.log(event.target.value)
        setNewNumber(event.target.value)
        // setPersons(services.concat(newName))
        //setNewName('')
    }
    const handleFilter= (event)=>{
        console.log(event.target.value)
        setFilter(event.target.value)
    }



    const delEntry = (person)=>{

       window.confirm(`are you sure you want to delete ${person.name}`)
        console.log('delete submitted')
        const id=person.id
        const newpersons=persons.filter(person=>
        person.id!==id)
        personService.deleteEntry(person.id).then(
            setPersons(newpersons))


            .catch(error=>console.log(error.value))
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

            if(window.confirm("Do you want to change the phone number")){
               updateNumber(persons.find((obj)=>obj.name===newName),personPObj)
            }
            setNewName('')
            setNewNumber('')
            setAddedMessage(`Note: '${personPObj.name}' is already in the phonebook!`)
            setTimeout(() => {
                setAddedMessage(null)
            }, 5000)

            return
        }
        personService.create(personPObj)
            .then(response => {
                console.log(response.data)


                setPersons(persons.concat(personPObj))
                setNewName('')
                setNewNumber('')
                setAddedMessage(`Note: '${personPObj.name}' added to phonebook!`)
                        setTimeout(() => {
                            setAddedMessage(null)
                        }, 5000)
            })

    }


    const updateNumber=(person,newperson)=>{
        console.log(person)
        console.log(newperson)
        personService.update(person.id,newperson)
        setPersons(persons.map(p=>p.name===newperson.name? p:newperson))
    }





    const showNotes=newFilter===''?
        persons:persons.filter(person=> person.name.toLowerCase().includes(newFilter.toLowerCase())===true)



    console.log(showNotes)


    return (
        <div>
            <h2>Filter</h2>
            <Filter newFilter={newFilter}  handleFilter={handleFilter}/>
            <Notification message={addedMessage}/>

            <h2>Add a new</h2>
            <PersonForm newName={newName} handleNewName={handleNewName}
                newNumber={newNumber}  handleNewNumber={handleNewNumber}
                        addNewNames={addNewNames}
            />

            <h2>Numbers</h2>
            <Persons showNotes={showNotes} delEntry={delEntry}/>
        </div>
    )
}

export default App