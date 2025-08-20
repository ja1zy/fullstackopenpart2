import ReactDOM from 'react-dom/client'
import App from './App'
//import axios from 'axios'


//A Promise is an object representing the eventual completion
// or failure of an asynchronous operation.

//n other words, a promise is an object that represents an asynchronous operation.
// A promise can have three distinct states:

// The promise is pending:
// It means that the asynchronous operation corresponding to the promise has not yet finished and the final value is not available yet.
// The promise is fulfilled:
// It means that the operation has been completed and the final value is available, which generally is a successful operation.
// The promise is rejected:
// It means that an error prevented the final value from being determined, which generally represents a failed operation.
/*
const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

//this one fails
const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)

//if, and when, we want to access the result of the operation represented by the promise,
// we must register an event handler to the promise. This is achieved using the method then:
promise.then(response => {
    console.log(response)
})


*/


ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)