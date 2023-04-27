import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Veri from "./verify";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Test from "./test";

import TeachProfile from "./teach_profile";
import Que from "./que";
import One from "./mcqs";
import StuProflie from "./student_profile"
import Test_one from "./test_one";


function IntoProfile(){
    return(
        <div> 
            <Routes>
                <Route path='/' element={<Veri/>}></Route>
                <Route path='/test' element={<Test/>}></Route>
                <Route path='/test_one' element={<Test_one/>}></Route>
                <Route path='/teacherprofile' element={<TeachProfile/>}></Route>
                <Route path='/studentprofile' element={<StuProflie/>}></Route>
                <Route path='/que' element={<Que/>}></Route>
                <Route path='/one' element={<One/>}></Route>
            </Routes>
            
            <Outlet/>
        </div>
    );
}

export default IntoProfile