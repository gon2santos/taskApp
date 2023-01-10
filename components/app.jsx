import styles from '../styles/Home.module.css';
import Slot from '../components/slot';
import React from 'react';
import { useSelector } from 'react-redux';

export default function App() {

    const { project1, project2, project3, project4 } = useSelector((state) => state.project);

    return (
        <div>
            <h1 className={styles.title}>
                Project tasks App
            </h1>

            <p className={styles.description}>
                Start by adding a new project
            </p>

            <div className={styles.grid}>
                <Slot linkSrc={"projectView"} title={project1}/>

                <Slot linkSrc={"projectView"} title={project2}/>

                <Slot linkSrc={"projectView"} title={project3}/>

                <Slot linkSrc={"projectView"} title={project4}/>
            </div>
        </div>
    )
}