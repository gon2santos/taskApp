import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Link from 'next/link'
import { useState } from 'react'; 
import TaskInput from '../components/taskInput';

export default function Project() {

  const [projectName, setProjectName] = useState('');
  const [taskName, setTaskName] = useState('');

  return (
    <div className={styles.container}>
      <Head>
        <title>New Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Add a new project
        </h1>

        <form>
          <div className={styles.addProject}>
            <div className={styles.taskInput}><label htmlFor="projectName">Project name:</label><input className={styles.inputBox} name='projectName' value={projectName} placeholder='Castle drawing' onChange={(e) => setProjectName(e.target.value)}/></div>
            <TaskInput/>
            <TaskInput/>
            <TaskInput/>
            <input type="button" value="Add task" onClick={() => console.log("Mandar valores del store a la API")}/>
          </div>
        </form>
      
        <Link href={"/"}>
            <h1>Home &rarr;</h1>
        </Link>

      </main>

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