import React, { useEffect, useState } from "react";
import CommonBar from "./commonNav";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Test from "./test";

function TeachProfile(){
    const [que, setque] = useState(0);
    const [mcq, setmcq] = useState(0);

    function addque(){
      setque(1);
      setmcq(0);
    }

    function addmcq(){
        setmcq(1);
        setque(0);
    }
    
    const navigate = useNavigate();

    return(
        <div>
            <CommonBar/>
            <div className="box">
                <center>
                <h2 className="Heading1">A friendly tool for managing and grading student assessments.</h2>
                <button type="submit" class="addque" onClick={addque}>Add True/False Question</button>
                <button type="submit" class="addque" onClick={addmcq}>Add One Word Answer Question</button>
                {que ? navigate('/que') : console.log(1)}
                {mcq ? navigate('/one') : console.log(1)}
                </center>
            </div>
        </div>
    );
}

export default TeachProfile