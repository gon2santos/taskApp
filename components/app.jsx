import styles from '../styles/Home.module.css';
import React from 'react';
import { useState } from 'react';
import Project from './project';
import Link from 'next/link'
import { useGetProjectsQuery, useGetTasksQueueQuery, useDeleteTasksMutation, useSetCurrProjMutation } from '../redux/apiSlice';
import Image from 'next/image';

export default function App() {

    const [toggleNewProject, setToggleNewProject] = useState(false);

    const projectsQuery = useGetProjectsQuery();
    const queueQuery = useGetTasksQueueQuery();
    const [deleteTasks, response_delete] = useDeleteTasksMutation()
    const [setCurrProj, response_currProj] = useSetCurrProjMutation()

    const projectBoxStyles = [styles.projectBoxYellow, styles.projectBoxRed, styles.projectBoxGreen, styles.projectBoxBlue, styles.projectBoxPink, styles.projectBoxOrange];

    const HandleCheckTask = function () {
        let taskData = { "projectId": queueQuery.data[0].proj_id, "taskId": queueQuery.data[0]._id, "projQtty": projectsQuery?.data.length }
        deleteTasks(taskData)
            .unwrap()
            .then(() => {
                if (queueQuery.data.length === 0) {
                    console.log("Resetting current project counter");
                    let currProjData = { "num": 0 }
                    setCurrProj(currProjData).then(() => { }).catch((error) => {
                        console.log("HandleCheckTask.setCurrProj error: " + error)
                    })
                }
            })
            .catch((error) => {
                console.log("HandleCheckTask error: " + error)
            })
    }

    var i = 0/* Math.floor(Math.random() * projectBoxStyles.length) */


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


            <p className={styles.description}>
                {(projectsQuery.isSuccess && !projectsQuery.data?.length) ?
                    <>Start by adding a new project</> :
                    <>{queueQuery?.data?.length ? <></> :
                        <>Add tasks to your projects</>
                    }
                    </>
                }
            </p>


            <div className={styles.currentTask}>
                {(queueQuery.isSuccess && queueQuery.data.length) ?
                    <div>
                        <div><span className={styles.todo}>To Do:</span>{` ${queueQuery.data[0]?.name}`}<span className={styles.checkMarkBox} onClick={() => HandleCheckTask()}><span className={styles.checkMark}>✔️</span></span></div>
                    </div> :
                    <></>
                }
            </div>

            <span className={styles.projectsSeparator}>My Projects</span>


            {toggleNewProject ? <><Project toggleFunction={setToggleNewProject} /><h1 className={styles.link} onClick={() => setToggleNewProject(!toggleNewProject)}>&larr; Cancel</h1></>
                : <div className={styles.grid}>
                    {!projectsQuery.isSuccess ? <></> : projectsQuery?.data.map((element) => {
                        if (i < projectBoxStyles.length - 1) i = i + 1;
                        else i = 0;
                        return (<Link key={element._id} href={{ pathname: '/tasks', query: { id: element._id } }} className={projectBoxStyles[i]} >
                            <span>{element.name}</span>
                        </Link>)
                    }
                    )}
                    <p className={styles.linkProject} onClick={() => setToggleNewProject(!toggleNewProject)}>New project +</p>
                </div>}

        </div>
    )
}