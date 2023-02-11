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

    var taskArr;
    var taskTitle;
    var taskBody;
    if (queueQuery.isSuccess) {
        taskArr = queueQuery.data[0]?.name?.split(' ');
        taskTitle = `${taskArr[0] ? taskArr[0] : ""} ${taskArr[1] ? taskArr[1] : ""} ${taskArr[2] ? taskArr[2] : ""} ${taskArr[3] ? taskArr[3] : ""} ${taskArr[4] ? taskArr[4] : ""}`;
        taskBody = queueQuery.data[0]?.name?.substring(taskTitle.length) ? queueQuery.data[0]?.name?.substring(taskTitle.length) : "";
    }

    const size = useWindowSize();


    return (
        <div>
            <div className={styles.mainTitleContainer}>
                <Image
                    priority
                    src="/octodo_logo.png"
                    width={size.width < 600 ? 328 : 458}
                    height={size.width < 600 ? 129 : 180}
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
                        <div className={styles.todo}><span>To Do:</span></div>
                        <div><div className={styles.taskTitle}>{taskTitle}</div><div className={styles.taskBody}>{taskBody}</div></div>
                        <div className={styles.checkMarkBox} onClick={() => HandleCheckTask()}><div className={styles.checkMark}>✔️</div></div>
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

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // only execute all the code below in client side
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}