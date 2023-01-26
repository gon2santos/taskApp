import styles from '../styles/Home.module.css';
import React from 'react';
import { useState } from 'react';
import { useLoginUserMutation, useCreateUserMutation, useCreateCurrProjMutation } from '../redux/apiSlice';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/router'

export default function Login() {

    const router = useRouter()
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [toggleCreate, setToggleCreate] = useState(false);
    const [login, response_login] = useLoginUserMutation();
    const [create, response_create] = useCreateUserMutation();
    const [createCurrPrj, response_createCurrPrj] = useCreateCurrProjMutation();
    const [loginMsg, setLoginMsg] = useState("");

    function HandleLoginUser() {
        login({ email: userName, pwd: password }).then(() => { }).catch((error) => {
            console.log("HandleLoginUser error: " + error)
        })
    }


    function HandleCreateUser() {
        create({ email: userName, pwd: password }).then(() => {createCurrPrj({ email: userName })}).catch((error) => {
            console.log("HandleCreateUser error: " + error)
        })
    }

    useEffect(() => {
        if(response_login?.data?.msg === "LOGIN_SUCCESS"){
            setLoginMsg("Log in successful");
            localStorage.setItem("accessToken", response_login?.data?.accessToken);
            localStorage.setItem("userEmail", userName);
            router.push('/');
        }
        else if(response_login?.data?.msg === "LOGIN_FAIL" || response_login?.data?.msg === "USER_NOT_FOUND"){
            setLoginMsg("Incorrect Email or Password");
        }
        else if(response_create?.data?.msg === "USER_CREATED"){
            setLoginMsg("Account created, please log in");
            setToggleCreate(!toggleCreate);
        }
      }, [response_login, response_create]);

    /* if(response_login?.data?.msg === "LOGIN_SUCCESS"){
        setLoginMsg("Log in successful");
    }
    else if(response_login?.data?.msg === "LOGIN_FAIL"){
        setLoginMsg("Incorrect Email or Password");
    } */

    return (
        <div>

            <div className={styles.mainTitleContainer}>
                <Image
                    priority
                    src="/octodo_logo.png"
                    height={180}
                    width={458}
                    alt=""
                />
            </div>


            <div className={styles.username}><label htmlFor="userName"><h2>User:</h2></label><input autoFocus className={styles.loginInputBox} name='userName' value={userName} placeholder='email address' onChange={(e) => setUserName(e.target.value)} /></div>
            <div className={styles.password}><label htmlFor="password"><h2>Password:</h2></label><input type='password' className={styles.loginInputBox} name='password' value={password} placeholder='*************' onChange={(e) => setPassword(e.target.value)} /></div>

            <button className={styles.loginButton} onClick={() => toggleCreate ? HandleCreateUser() : HandleLoginUser()}>{!toggleCreate ? <h2>Login</h2> : <h2>Create Account</h2>}</button>

            {<h3 style={{color:'rgb(185, 187, 59)'}}>{loginMsg}</h3>}

            <div className={styles.createAccountButton}>{!toggleCreate ? <div onClick={() => setToggleCreate(!toggleCreate)}>Not registered? Create an account</div> : <div onClick={() => setToggleCreate(!toggleCreate)}>Already have an account? Login</div>}</div>
            
        </div>
    )
}