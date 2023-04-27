import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import ReactDOM from "react-dom";
import TopBar from "./topbar";
import { useNavigate } from "react-router-dom";

function Veri() {
  const [pop, setpop] = useState(0);
  const [test, settest] = useState(0);
 
  const navigate = useNavigate();

  function PopulateDB(){
    setpop(1);
    settest(0);
  }
  
  function Test(){
    setpop(0);
    settest(1);
  }
  return (
    <div className="EntryPage">
      <TopBar />
      <div className="box">
        <center>
          <h2 className="Heading1">A Friendly Tool for Managing and Grading Student Assessments!</h2>
          <button type="submit" class="btn btn-outline-dark btn-lg entry-button" onClick={PopulateDB}>Add Questions</button>
          <p>Click here to populate the questions database</p>
          <button type="submit" class="btn btn-outline-dark btn-lg entry-button" onClick={Test}>Take Test</button>
          <p>Click here to view the demo</p>
          {pop ? navigate('/teacherprofile'): console.log(1)}
          {test ? navigate('/studentprofile') : console.log(1)}
        </center>
      </div>
    </div>
  );
}
export default Veri;



