import Head from 'next/head'
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { useCreateProjectMutation } from '../redux/apiSlice';
import { updateProjects } from '../redux/slice';
import { useDispatch, useSelector } from 'react-redux';

export default function Project(props) {

  const dispatch = useDispatch();

  const { updatePrj } = useSelector((state) => state.project);

  const [projectName, setProjectName] = useState('');
  const [createProject, response] = useCreateProjectMutation();

  const HandleCreateProject = (e) => {
    e.preventDefault()
    let projectData = { "name": projectName, "email": localStorage.getItem("userEmail") };
    createProject(projectData)
            .unwrap()
            .then(() => {dispatch(updateProjects(!updatePrj))})
            .catch((error) => {
                console.log("HandleCreateProject error: " + error)
            })
    props.toggleFunction(false);
  }


  return (
    <div>
      <Head>
        <title>New Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={(e) => HandleCreateProject(e)}>
        <div className={styles.projectName}><label htmlFor="projectName"><h1>Project name:</h1></label><input autoFocus className={styles.inputBox} name='projectName' value={projectName} placeholder='...' onChange={(e) => setProjectName(e.target.value)} /></div>
      </form>
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