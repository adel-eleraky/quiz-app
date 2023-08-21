/* eslint-disable react/prop-types */

import { decode } from "html-entities";


function Question(props){
    
    const allChoices = [...props.incorrect_answers , props.correct_answer]
    // console.log(props)
    const choiceInput = allChoices.map((choice , index) => {
        return (
            <div className="choice" key={index}>
                <input id={`${choice}-question${props.id}`}  name={`question${props.id}`} value={decode(choice)} type="radio" onChange={(e) => props.handleChange(e , props.correct_answer)}/>
                <label htmlFor={`${choice}-question${props.id}`} >{decode(choice)}</label>
            </div>
        )
    })

    return (
        <div  className="question-card">
            <h3>{decode(props.question)}</h3>
            {choiceInput}
            <hr/>
        </div>
    )
}


export default Question;