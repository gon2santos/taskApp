import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Project from '../components/project';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import React, { useState } from 'react';
import TaskInput from '../components/taskInput';
import ProjectManager from '../components/projectManager';
import { useRouter } from 'next/router'
import Image from 'next/image';

export default function Tasks() {
  const router = useRouter()

  const [showProjMan, setShowProjMan] = useState(false);
  const [rotOptBtn, setRotOptBtn] = useState(false);

  return (
    <div className={styles.containerDark}>
      <Head>
        <title>Add tasks to project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <React.StrictMode>
        <Provider store={store}>
          <main>
            <div className={styles.projManSelection}>
              {<div className={!rotOptBtn ? styles.projManSelectionButton : styles.projManSelectionButtonSelected} onClick={() => {setShowProjMan(!showProjMan); setRotOptBtn(!rotOptBtn);}}>
                <Image
                  priority
                  src="/optionsButton.svg"
                  height={40}
                  width={40}
                  alt=""
                />
              </div>}
              {showProjMan ? <ProjectManager id={router.query.id} /> : <></>}
            </div>
            <TaskInput id={router.query.id} />
          </main>
        </Provider>
      </React.StrictMode>
      <footer>
        <a
          href="https://github.com/gon2santos"
          target="_blank"
          rel="noopener noreferrer"
        >
          by Gonzalo Dos Santos{' '}
          <img src="/github.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 0rem 0;
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