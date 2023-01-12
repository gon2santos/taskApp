import styles from '../styles/Home.module.css';
import Slot from '../components/slot';
import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Project from './project';
import { addProject, deleteProject, editProject } from '../redux/slice';


export default function App() {

    const { projects, projNum } = useSelector((state) => state.project);
    const [toggleNewProject, setToggleNewProject] = useState(false);
    let i = 0;

    return (
        <div>
            <h1 className={styles.title}>
                Project tasks App
            </h1>

            <p className={styles.description}>
            {(projNum === 0) ? <>Start by adding a new project</> : <>Add tasks to your current projects</> }
            </p>
            {toggleNewProject ? <><Project toggleFunction={setToggleNewProject} /><h1 className={styles.link} onClick={() => setToggleNewProject(!toggleNewProject)}>&larr; Cancel</h1></> :

                <div className={styles.grid}>
                    {(projNum === 0) ? <></> : projects.map((element) => { i++; return(<span key={i} className={styles.projectBox} onClick={() => alert(`Show tasks for ${element.name}`)}><h1>{element.name}</h1></span>);})}
                    <span className={styles.link} onClick={() => setToggleNewProject(!toggleNewProject)}><h1>New project +</h1></span>
                </div>}

        </div>
    )
}