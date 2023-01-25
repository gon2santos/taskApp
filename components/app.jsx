import styles from '../styles/Home.module.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Project from './project';
import Link from 'next/link'
import { useGetProjectsMutation, useGetTasksQueueMutation, useCheckTaskMutation } from '../redux/apiSlice';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { updateProjects } from '../redux/slice';

export default function App() {

    const dispatch = useDispatch();

    const [toggleNewProject, setToggleNewProject] = useState(false);

    const [getProjects, projectsQuery] = useGetProjectsMutation();
    const [getTasksQueue, queueQuery] = useGetTasksQueueMutation();
    const [checkTask, response_check] = useCheckTaskMutation();

    const { updatePrj } = useSelector((state) => state.project);

    const projectBoxStyles = [styles.projectBoxYellow, styles.projectBoxRed, styles.projectBoxGreen, styles.projectBoxBlue, styles.projectBoxPink, styles.projectBoxOrange];

    useEffect(() => {
        HandleGetProjects();
        HandleGetQueue();
    }, [updatePrj]);

    function HandleGetProjects() {
        getProjects({ email: localStorage.getItem("userEmail") }).then(() => { }).catch((error) => {
            console.log("HandleGetProjects error: " + error)
        })
    }

    function HandleGetQueue() {
        getTasksQueue({ email: localStorage.getItem("userEmail") }).then(() => { }).catch((error) => {
            console.log("HandleGetQueue error: " + error)
        })
    }


    const HandleCheckTask = function () {
        let taskData = { "projectId": queueQuery.data[0].proj_id, "taskId": queueQuery.data[0]._id, "projQtty": projectsQuery?.data.length, "email": localStorage.getItem("userEmail") }
        checkTask(taskData)
            .unwrap()
            .then(() => {
                dispatch(updateProjects(!updatePrj))
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


            <div>
                {(queueQuery.isSuccess && queueQuery.data.length) ?
                    <div className={styles.currentTask}>
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