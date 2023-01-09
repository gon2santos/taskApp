import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function TaskInput() {

    const [taskName, setTaskName] = useState('');

    return (
        <div>

            <div className={styles.taskInput}>
                <label htmlFor="taskName">Task name:</label>
                <input
                    className={styles.inputBox}
                    name='taskName'
                    value={taskName}
                    placeholder='paint castle'
                    onChange={(e) => setTaskName(e.target.value)}
                />
            </div>
        </div>
    )
}