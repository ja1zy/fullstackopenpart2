const Display = (props) => {
    return (
        <div>{props.counter}</div>
    )
}

const Header= ({course})=>{
    return (
        <h1>{course.name}</h1>
    )
}
const Total = ({course})=>{
    const start=0

    const addTwo = (a,b)=> a.exercises+b.exercises


    const total = course.parts.reduce((addTwo,p)=>{
        console.log(p.exercises,"p")
        console.log(addTwo)
        return p.exercises+addTwo.exercises
    })
    return (
        <p>
            Number of exercises: {total}
        </p>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header key={course.id} course={course}/>

            {course.parts.map(part=>
                <p>{part.name}: {part.exercises}</p>
            )}
             <Total course={course}/>
        </div>
    );
}

export default Course