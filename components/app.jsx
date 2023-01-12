import styles from '../styles/Home.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Project from './project';
import { addTask } from '../redux/slice';
import Link from 'next/link'


export default function App() {

    const { projects, projNum, taskQueue } = useSelector((state) => state.project);
    const [toggleNewProject, setToggleNewProject] = useState(false);
    const dispatch = useDispatch();

    return (
        <div>
            <h1 className={styles.title}>
                Project tasks App
            </h1>

            <p className={styles.description}>
                {(projNum === 0) ? <>Start by adding a new project</> : <>Add tasks to your current projects</>}
            </p>
            {taskQueue.length ? <h1>Current task: {projects[Object.keys(taskQueue[0])[0]]?.tasks[taskQueue[0][Object.keys(taskQueue[0])[0]]]} ✔️</h1> : <></> }
            {toggleNewProject ? <><Project toggleFunction={setToggleNewProject} /><h1 className={styles.link} onClick={() => setToggleNewProject(!toggleNewProject)}>&larr; Cancel</h1></> :
                <div className={styles.grid}>
                    {(projNum === 0) ? <></> : projects.map((element) =>
                        <Link href={{ pathname: '/tasks', query: { id: element.id } }} className={styles.projectBox} >
                            <span key={element.id}><h1>{element.name}</h1></span>
                        </Link>
                    )}
                    <span className={styles.link} onClick={() => setToggleNewProject(!toggleNewProject)}><h1>New project +</h1></span>
                </div>}

        </div>
    )
}