import React, { useEffect, useState } from "react";
import CommonBar from "./commonNav";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

function Test(){
    const [link_question, setlink_question] = useState('');
    const [link_answer, setlink_answer] = useState('');
    const recorderQuestionControls = useAudioRecorder();
    const recorderAnswerControls = useAudioRecorder();

    let ques, answ;

    const addQuestionAudioElement = (blob) => {
      const url = URL.createObjectURL(blob);
      const audio = document.createElement("audio");
      audio.src = url;
      setlink_question(url);
      audio.controls = true;
      document.body.appendChild(audio);
  
      const existingDownloadLink = document.getElementById("audio-download-link");
      if (existingDownloadLink) {
        existingDownloadLink.parentNode.removeChild(existingDownloadLink);
      }
  
      const downloadLink = document.createElement("a");
      downloadLink.id = "audio-download-link";
      downloadLink.href = url;
      downloadLink.download = "question.wav";
      document.body.appendChild(downloadLink);
  
      downloadLink.click();
    };
    const addAnswerAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        setlink_answer(url);
        audio.controls = true;
        document.body.appendChild(audio);
    
        const existingDownloadLink = document.getElementById("audio-download-link");
        if (existingDownloadLink) {
          existingDownloadLink.parentNode.removeChild(existingDownloadLink);
        }
    
        const downloadLink = document.createElement("a");
        downloadLink.id = "audio-download-link";
        downloadLink.href = url;
        downloadLink.download = "answer.wav";
        document.body.appendChild(downloadLink);
    
        downloadLink.click();
    };
    const [result, setResult] = useState("");

    const SubmitData = async (e) => {
        e.preventDefault();
        ques = link_question
        answ = link_answer
        console.log(ques)
        console.log(answ)
        const res = await fetch("/api/send-truefalse", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                question: ques,
                answer: answ
            })
        });
        const data = await res.json();
        if(data.status === 422 || !data){
            window.alert("Error Occured while Uploading")
            console.log("Not Sucess")
        }else{
            window.alert("Evaluated Sucessfully")
            console.log("Sucess")
        }
        
        const response = await fetch("/run-python-tf", {
            method: "POST",
            body: JSON.stringify({ data: "redundant/data" }),
            headers: { "Content-Type": "application/json" },
          });
          const resultText = await response.text();
          setResult(resultText);
          console.log(resultText);
          const resultList = resultText.split("\n");
          const tag1 = document.createElement("p")
          tag1.innerHTML = "Question:";
          tag1.style.textAlign = "center";
          document.body.appendChild(tag1);
          const data_que = document.createElement("p")
          data_que.innerHTML = resultList[1];
          data_que.style.textAlign = "center";
          data_que.style.fontWeight = 'bold';
          document.body.appendChild(data_que);
          const tag2 = document.createElement("p")
          tag2.innerHTML = "Answer:";
          tag2.style.textAlign = "center";
          document.body.appendChild(tag2);
          const data_ans = document.createElement("p")
          data_ans.innerHTML = resultList[2];
          data_ans.style.textAlign = "center";
          data_ans.style.fontWeight = 'bold';
          document.body.appendChild(data_ans);
          const tag3 = document.createElement("p")
          tag3.innerHTML = "Sumbitted Answer:";
          tag3.style.textAlign = "center";
          document.body.appendChild(tag3);
          const trans_ans = document.createElement("p")
          trans_ans.innerHTML = resultList[0];
          trans_ans.style.textAlign = "center";
          trans_ans.style.fontWeight = 'bold';
          document.body.appendChild(trans_ans);
          const tag4 = document.createElement("p")
          tag4.innerHTML = "Result:";
          tag4.style.textAlign = "center";
          document.body.appendChild(tag4);
          const correct = document.createElement("p")
          correct.innerHTML = resultList[3];
          correct.style.textAlign = "center";
          correct.style.fontWeight = 'bold';
          if (resultList[3] === "Wrong"){
            correct.style.color = "red";
          }
          else{
            correct.style.color = "green";
          }
          document.body.appendChild(correct);
    }


    const navigate = useNavigate();


    return(
        <div>
            <CommonBar/>
            <div className="box">
                <center>
                    <h2>Welcome to the test, let's start!</h2><br/><br/>
                </center>
                <center>
                    <div>
                        <h4>Question:</h4>
                        <br/>
                        <AudioRecorder
                            onRecordingComplete={(blob) => addQuestionAudioElement(blob)}
                            recorderControls={recorderQuestionControls}
                        /><br/><br/>
                        <h4>Answer:</h4>
                        <br/>
                        <AudioRecorder
                            onRecordingComplete={(blob) => addAnswerAudioElement(blob)}
                            recorderControls={recorderAnswerControls}
                        />
                    </div>
                    <button type="submit" class="btn btn-outline-dark btn entry-button" onClick={SubmitData}>
                        Evaluate
                    </button>
                </center>
            </div>
        </div>
    );
}

export default Test