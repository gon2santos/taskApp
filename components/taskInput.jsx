import Head from 'next/head'
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGetProjectsMutation, useCreateTaskMutation, useUpdateTasksQueueMutation } from '../redux/apiSlice';
import Task from './task';
import { useDispatch, useSelector } from 'react-redux';
import { updateProjects } from '../redux/slice';

export default function TaskInput(props) {

  const [createTask, response] = useCreateTaskMutation();
  const [updateQueue, response_updateQueue] = useUpdateTasksQueueMutation();

  const { updatePrj } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  const HandleCreateTask = (e) => {
    e.preventDefault();
    let taskData = { "name": taskDetail, "projectId": props.id };
    createTask(taskData)
      .unwrap()
      .then(() => {
        updateQueue({ "email": localStorage.getItem("userEmail") })
      })
      .then(() => dispatch(updateProjects(!updatePrj)))
      .catch((error) => {
        console.log("HandleCreateTask error: " + error)
      })
    setTaskDetail("");
  }

  const [taskDetail, setTaskDetail] = useState("");

  const [getProjects, projectsQuery] = useGetProjectsMutation();

  function HandleGetProjects() {
    getProjects({ email: localStorage.getItem("userEmail") }).then(() => { }).catch((error) => {
      console.log("HandleGetProjects error: " + error)
    })
  }

  useEffect(() => {
    HandleGetProjects();
  }, [updatePrj]);

  var proj = {};

  proj = projectsQuery?.data?.find(p => p._id === props.id);


  return (
    <div >
      <Head>
        <title>New Task</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>
        {proj?.name}
      </h1>

      <div >
        <ol className={styles.tasksList}>
          {proj?.tasks.map(element => {
            return (<span key={element._id}><div><Task name={element.name} id={element._id} projId={props.id} /></div></span>)
          })}
        </ol>
      </div>


      <form onSubmit={(e) => HandleCreateTask(e)}>
        <div className={styles.newTaskContainer}>
          <label htmlFor="taskDetail" className={styles.newTaskLabel}>New task:</label>
          <input autoFocus className={styles.newTaskInputBox} name='taskDetail' value={taskDetail} placeholder='...' onChange={(e) => setTaskDetail(e.target.value)} />
        </div>
      </form>

      <Link className={styles.link} href="/"><h1 >&larr; Back</h1></Link>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}