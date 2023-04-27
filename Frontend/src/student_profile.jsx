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
                <h2 className="Heading1">Choose the Mode of the Test</h2>
                <button type="submit" class="addque" onClick={addque}>True/False Questions</button>
                <button type="submit" class="addque" onClick={addmcq}>One Word Answer Questions</button>
                {que ? navigate('/test') : console.log(1)}
                {mcq ? navigate('/test_one') : console.log(1)}
                </center>
            </div>
        </div>
    );
}

export default TeachProfile