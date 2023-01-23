import styles from '../styles/Home.module.css';
import React from 'react';
import { useState } from 'react';
import { useGetProjectsQuery, useGetTasksQueueQuery, useDeleteTasksMutation, useSetCurrProjMutation } from '../redux/apiSlice';
import Image from 'next/image';

export default function Login() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

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


            <div className={styles.username}><label htmlFor="userName"><h2>User:</h2></label><input autoFocus className={styles.inputBox} name='userName' value={userName} placeholder='email address' onChange={(e) => setUserName(e.target.value)} /></div>
            <div className={styles.password}><label htmlFor="password"><h2>Password:</h2></label><input type='password' className={styles.inputBox} name='password' value={password} placeholder='*************' onChange={(e) => setPassword(e.target.value)} /></div>

            <button className={styles.loginButton}><h2>Login</h2></button>
        </div>
    )
}