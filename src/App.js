import React from "react";
import Navbar from "./components/navbar";
import Main from "./components/main";


export default function App(){

    function handleClicks(){
        // console.log("clicked")
    }
    return (
        <div>
            <Navbar />
            <Main />
        </div>
    )
}