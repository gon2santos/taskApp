import styles from '../styles/Home.module.css';
import { useRenameTaskMutation, useDeleteTaskMutation } from '../redux/apiSlice';
import { useState } from 'react';

export default function Task(props) {

  const [renameTask, response_rename] = useRenameTaskMutation();
  const [deleteTask, response_delete] = useDeleteTaskMutation();

  const [rename, setRename] = useState("");
  const [toggleRenameInput, setToggleRenameInput] = useState(false);

  const HandleRenameTask = (e) => {
    e.preventDefault();
    let taskNameData = { "taskId": props.id, "name": rename }
    renameTask(taskNameData)
      .unwrap()
      .then(() => { })
      .catch((error) => {
        console.log("HandleRenameTask error: " + error)
      })
    setToggleRenameInput(!toggleRenameInput)
  }

  const HandleDeleteTask = () => {
    let taskDeleteData = { "projectId": props.projId, "taskId": props.id }
    deleteTask(taskDeleteData)
      .unwrap()
      .then(() => { })
      .catch((error) => {
        console.log("HandleDeleteTask error: " + error)
      })
  }

  return (
    <div className={styles.tasks}>
      <div>
        {toggleRenameInput ?
          <form onSubmit={(e) => HandleRenameTask(e)}>
            <input autoFocus name='taskName' value={rename} /* placeholder='...' */ onChange={(e) => setRename(e.target.value)} />
          </form>
          : <span>{props.name}</span>} <button onClick={() => setToggleRenameInput(!toggleRenameInput)}>Rename</button><button onClick={() => HandleDeleteTask()}>delete</button>
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