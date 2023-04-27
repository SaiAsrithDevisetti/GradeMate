import React, { useEffect, useState } from "react";
import CommonBar from "./commonNav";
import { BrowserRouter, useNavigate } from "react-router-dom";

function OneWord(){
    const [Backq, setBackq] = useState(0);
    const [Question, setQuestion] = useState('');
    const [Answer, setAnswer] = useState('');

    let val, name;
    let quest, answ, question, answer;
    const navigate = useNavigate();
    function Backqu(){
        setBackq(1);
    }
    const handleInput = (e) => {
        name = e.target.name;
        val = e.target.value;
        if (name === "question"){
            setQuestion(val)
        }else if(name === "answer"){
            setAnswer(val)
        }
        console.log(name)
        console.log(val)
    }
    const PostData = async (e) => {
        e.preventDefault();
        quest = Question
        answ = Answer
        console.log(quest)
        console.log(answ)
        const res = await fetch("/oneword", {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: quest,
                answer: answ
            })
        });
        const data = await res.json();
        if(data.status === 422 || !data){
            window.alert("Error Occured while Uploading")
            console.log("Not Sucess")
        }else{
            window.alert("Posted Sucessfully")
            console.log("Sucess")
        }
    }
    return(
        <div>
            <CommonBar/>
            <div className="form" method="POST">
                <center>
                    <h2>Enter the Question and Answer</h2><br/>
                    <div class="input_field">
                        <label>Question</label>
                        <input type="text" className="input" id="question" name="question" 
                        value={question} onChange={handleInput}></input>
                    </div>
                    <div class="input_field">
                        <label>Answer</label>
                        <input type="text" className="input" id="answer" name="answer"
                        value={answer} onChange={handleInput}></input>
                    </div>
                    <button type="submit" class="btn btn-outline-dark btn entry-button" onClick={PostData}>Post</button> 
                    <p><label>Cancel add request:</label></p>
                    <button type="submit" class="btn btn-outline-dark btn entry-button" onClick={Backqu}>Back</button>
                    {Backq ? navigate('/teacherprofile') : console.log(1)}
                </center>
            </div>
        </div>
    );
}

export default OneWord