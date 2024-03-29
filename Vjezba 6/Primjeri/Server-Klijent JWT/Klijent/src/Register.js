import React, { useState } from "react";
import {navigate} from "@reach/router";

export const Register = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }
    
    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function onChangePassword2(e) {
        setPassword2(e.target.value);
    }
    
    function handleLogin(e) {
        e.preventDefault();
    
        if (password !== password2) {
            console.log("Passwords do not match");
            return;
        }

        fetch("http://localhost:4000/api/register", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then((resp)=>resp.json())
        .then((data)=>{
                console.log("User Registered!");
                navigate('/login'); 
        })
        .catch((err)=>console.log(err));
    }

    return(
    <div>
        <form onSubmit={(e) => {handleLogin(e);}}>
            <label htmlFor="email">Email</label>
            <input
                type="text"
                value={email}
                onChange={onChangeEmail}
                onBlur={onChangeEmail}
            ></input>

            <label htmlFor="password">Password</label>
            <input
                type="password"
                value={password}
                onChange={onChangePassword}
                onBlur={onChangePassword}
            ></input>

            <label htmlFor="repeat password">Repeat Password</label>
            <input
                type="password"
                value={password2}
                onChange={onChangePassword2}
                onBlur={onChangePassword2}
            ></input>

            <button type="submit">Register</button>
        </form>
    </div>
    )
};
export default Register;