import styles from '../styles/Home.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Project from './project';
import { checkTask } from '../redux/slice';
import Link from 'next/link'
import { useGetProjectsQuery } from '../redux/apiSlice';


export default function App() {

    const { projects, projNum, taskQueue } = useSelector((state) => state.project);
    const [toggleNewProject, setToggleNewProject] = useState(false);
    const dispatch = useDispatch();

    const { data, error, isLoading } = useGetProjectsQuery();



    return (
        <div>
            <h1 className={styles.title}>
                Project tasks App
            </h1>

            <p className={styles.description}>
                {(data?.length === 0) ? <>Start by adding a new project</> : <>Add tasks to your current projects</>}
            </p>
            {/* Show current task */}
            {taskQueue.length ? <div className={styles.currentTask}><h1>Current task: {projects[Object.keys(taskQueue[0])[0]]?.tasks[/* taskQueue[0][Object.keys(taskQueue[0])[0]] */0]} </h1> <h1></h1> <h1 className={styles.checkMark} onClick={() => dispatch(checkTask())}>✔️</h1></div> : <></> }
            
            {toggleNewProject ? <><Project toggleFunction={setToggleNewProject} /><h1 className={styles.link} onClick={() => setToggleNewProject(!toggleNewProject)}>&larr; Cancel</h1></> 
            : <div className={styles.grid}>
                    {(data?.length === 0) ? <></> : data?.map((element) =>
                        <Link key={element._id} href={{ pathname: '/tasks', query: { id: element._id } }} className={styles.projectBox} >
                            <span ><h1>{element.name}</h1></span>
                        </Link>
                    )}
                    <span className={styles.link} onClick={() => setToggleNewProject(!toggleNewProject)}><h1>New project +</h1></span>
                </div>}

        </div>
    )
}