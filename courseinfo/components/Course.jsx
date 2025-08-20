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
    const total = course.parts.reduce(( a ,b)=>
         a+b.exercises,0) //note that before the ',' is the accumulator function and after the ',' is the inital value
        //a is the  accumulator and is the current value
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