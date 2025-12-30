"use client"
import { useState } from "react";

const AutoSaveText = () => {
    const [text, setText] = useState(localStorage.getItem("text" || ""));

    const inputHandler = (e) => {
        localStorage.setItem("text", e.target.value)
        setText(e.target.value)
    }

    return <>
        <h1>Auto Save Text</h1>
        <input style={{ border: "1px solid black"}} className="border" type="text" value={text} onChange={inputHandler} />
        <button type="button" onClick={() => {
            localStorage.removeItem("text")
            setText("")
        }}>Clear</button>
    </>
}

export default AutoSaveText;