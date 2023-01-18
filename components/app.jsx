import styles from '../styles/Home.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Project from './project';
import Link from 'next/link'
import { useGetProjectsQuery, useGetTasksQueueQuery, useDeleteTasksMutation, useSetCurrProjMutation } from '../redux/apiSlice';


export default function App() {

    const [toggleNewProject, setToggleNewProject] = useState(false);
    const dispatch = useDispatch();

    const projectsQuery = useGetProjectsQuery();
    const queueQuery = useGetTasksQueueQuery();
    const [deleteTasks, response_delete] = useDeleteTasksMutation()
    const [setCurrProj, response_currProj] = useSetCurrProjMutation()

    const HandleCheckTask = function () {
        let taskData = { "projectId": queueQuery.data[0].proj_id, "taskId": queueQuery.data[0]._id, "projQtty": projectsQuery?.data.length }
        deleteTasks(taskData)
            .unwrap()
            .then(() => {
                if(queueQuery.data.length === 0){
                    console.log("Resetting current project counter");
                    let currProjData = { "num": 0 }
                    setCurrProj(currProjData).then(() => {}).catch((error) => {
                        console.log("HandleCheckTask.setCurrProj error: " + error)
                    })
                }
            })
            .catch((error) => {
                console.log("HandleCheckTask error: " + error)
            })
    }


    return (
        <div>
            <h1 className={styles.title}>
                Project tasks App
            </h1>

            <p className={styles.description}>
                {(projectsQuery.isSuccess && !projectsQuery.data?.length) ? <>Start by adding a new project</> : <>{queueQuery?.data?.length ? <></> : <>Add tasks to your projects</>}</>}
            </p>
            {/* Show current task */}
            {(queueQuery.isSuccess && queueQuery.data.length) ? <div className={styles.currentTask}><h1>Current task: {queueQuery.data[0]?.name} </h1> <h1 className={styles.checkMark} onClick={() => HandleCheckTask()}>✔️</h1></div> : <></>}

            {toggleNewProject ? <><Project toggleFunction={setToggleNewProject} /><h1 className={styles.link} onClick={() => setToggleNewProject(!toggleNewProject)}>&larr; Cancel</h1></>
                : <div className={styles.grid}>
                    {!projectsQuery.isSuccess ? <></> : projectsQuery?.data.map((element) =>
                        <Link key={element._id} href={{ pathname: '/tasks', query: { id: element._id } }} className={styles.projectBox} >
                            <span ><h1>{element.name}</h1></span>
                        </Link>
                    )}
                    <span className={styles.link} onClick={() => setToggleNewProject(!toggleNewProject)}><h1>New project +</h1></span>
                </div>}

        </div>
    )
}