import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject, renameProject } from '../redux/slice';
import { useRouter } from 'next/router'

export default function ProjectManager(props) {
    const dispatch = useDispatch();
    const [rename, setRename] = useState("");
    const router = useRouter()

    const HandleDelete = () => {
        dispatch(deleteProject({id: props.id}));
        router.push('/');
    }

    const HandleRename = () => {
        dispatch(renameProject({id: props.id, name: rename}));
    }

    return (
        <div>
            <div className={styles.projectName}><label htmlFor='rename'>New project name: </label> <input name='rename' onChange={(e) => setRename(e.target.value)} /> <button onClick={() => HandleRename()}>Rename this project</button></div>
            <button className={styles.deleteButton} onClick={() => HandleDelete()}>Delete this project</button>
        </div>
    )
}