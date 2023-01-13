import Head from 'next/head'
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/slice';
import Link from 'next/link';

export default function TaskInput(props) {

    const dispatch = useDispatch();
    const { projects } = useSelector((state) => state.project);

    const HandleSubmit = (e) => {
        e.preventDefault()
        dispatch(addTask({id: props.id, task: taskDetail}));
        setTaskDetail("");
    }

    const [taskDetail, setTaskDetail] = useState("");

    let i = 0;


    return (
        <div >
            <Head>
                <title>New Task</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>Tasks for {projects[props.id]?.name}</h1>
            <ol>
                {projects[props.id]?.tasks.map(element => {
                  i++;
                  return (<h2 key={i}><li>{element}</li></h2>)})}
            </ol>
            <form onSubmit={(e) => HandleSubmit(e)}>
                <div className={styles.projectName}><label htmlFor="taskDetail"><h1>New task: </h1></label><input autoFocus className={styles.inputBox} name='taskDetail' value={taskDetail} placeholder='...' onChange={(e) => setTaskDetail(e.target.value)} /></div>
            </form>

            <Link href="/"><h1 className={styles.link}>&larr; Back</h1></Link>

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