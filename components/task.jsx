import styles from '../styles/Home.module.css';
import { useRenameTaskMutation, useDeleteTaskMutation } from '../redux/apiSlice';
import { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { updateProjects } from '../redux/slice';

export default function Task(props) {

  const dispatch = useDispatch();
  const { updatePrj } = useSelector((state) => state.project);

  const [renameTask, response_rename] = useRenameTaskMutation();
  const [deleteTask, response_delete] = useDeleteTaskMutation();

  const [rename, setRename] = useState("");
  const [toggleRenameInput, setToggleRenameInput] = useState(false);

  const HandleRenameTask = (e) => {
    e.preventDefault();
    let taskNameData = { "taskId": props.id, "name": rename, "email": localStorage.getItem("userEmail") }
    renameTask(taskNameData)
      .unwrap()
      .then(() => {dispatch(updateProjects(!updatePrj))})
      .catch((error) => {
        console.log("HandleRenameTask error: " + error)
      })
    setToggleRenameInput(!toggleRenameInput)
  }

  const HandleDeleteTask = () => {
    let taskDeleteData = { "projectId": props.projId, "taskId": props.id, "email": localStorage.getItem("userEmail") }
    deleteTask(taskDeleteData)
      .unwrap()
      .then(() => {dispatch(updateProjects(!updatePrj))})
      .catch((error) => {
        console.log("HandleDeleteTask error: " + error)
      })
  }

  return (
    <div >
      <div className={styles.tasks}>
        {toggleRenameInput ?
          <form onSubmit={(e) => HandleRenameTask(e)}>
            <input className={styles.taskRenameInput} autoFocus name='taskName' value={rename} placeholder={props.name} onChange={(e) => setRename(e.target.value)} />
          </form>
          : <span>{props.name}</span>}
          <div className={styles.taskButtonsContainer}>
        <button className={styles.taskButtons} onClick={() => setToggleRenameInput(!toggleRenameInput)}><Image
          priority
          src="/editButton.svg"
          height={25}
          width={25}
          alt=""
        /></button>
        <button className={styles.taskButtons} onClick={() => HandleDeleteTask()}><Image
          priority
          src="/deleteButton.svg"
          height={25}
          width={25}
          alt=""
        /></button>
        </div>
      </div>

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