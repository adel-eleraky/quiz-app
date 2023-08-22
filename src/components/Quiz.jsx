/* eslint-disable no-unused-vars */
/* esdivnt-disable no-unused-vars */
import React from 'react'
import Question from './Question';

function Quiz() {
    const [questionsData, setQuestionsData] = React.useState();
    const [answers , setAnswers] = React.useState({});
    const [wrongAnswers , setWrongAnswers] = React.useState({});
    const [status , setStatus] = React.useState('notStarted');

    React.useEffect(() => {
        if(status === "notStarted"){
            fetch("https://opentdb.com/api.php?amount=5&type=multiple")
                .then(res => res.json())
                .then(apiData => setQuestionsData(apiData.results))
            
            setAnswers({})
            setWrongAnswers({})
        }
        
    }, [status])

    function handleChange(e  , correctAnswer){
        const {name , value} = e.target

        setAnswers(prev => ({
            ...prev,
            [name]: {userChoice: value , correctChoice: correctAnswer}
        }))
        
    }


    function handleSubmit(e) {
        e.preventDefault();

        if(Object.keys(answers).length !== 5 ) {
            console.log("answer all questions")
        }else{
            setStatus("formSubmitted")
            for(let question in answers){
                answers[question].correctChoice !== answers[question].userChoice ? 
                    setWrongAnswers(prev =>  ({
                        ...prev,
                        [question]: answers[question]
                    })) 
                : ""
            }
        }
    }


    const questionsElements = questionsData && questionsData.map((question, index) => {
        return <Question key={index} {...question} id={index + 1} handleChange={handleChange}/>
    })

    return (
        <>
            <div className="container">
                {status === "notStarted" ? 
                    <div>
                        <h2>Quizzical</h2>
                        <button onClick={() => setStatus("started")}>Start Quiz</button>
                    </div>
                : 
                    <form method='post' onSubmit={handleSubmit}>
                    {questionsData ?
                        <>
                            {questionsElements}
                            {status === "formSubmitted"  ? <div className="result">{`You Scored ${(5 - Object.keys(wrongAnswers).length )} / 5 correct Answers`}</div> : "" }
                            <button onClick={() => setStatus(prev => prev === "formSubmitted" ? "notStarted" : "")}>{status === "formSubmitted" ? "Play Again" : "Check Answers"}</button>
                        </>:
                        <h2>Loading</h2>
                    }
                    </form>
                }
            </div>
        </>
    )
}

export default Quiz
