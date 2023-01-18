import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject, renameProject } from '../redux/slice';
import { useRouter } from 'next/router'
import { useDeleteProjectMutation, useRenameProjectMutation } from '../redux/apiSlice';

export default function ProjectManager(props) {
    const dispatch = useDispatch();
    const [rename, setRename] = useState("")
    const router = useRouter()
    const [deleteProject, response_delete] = useDeleteProjectMutation()
    const [renameProject, response_rename] = useRenameProjectMutation()

    const HandleDeleteProject = () => {
        let projectData = { "projectId": props.id }
        deleteProject(projectData)
            .unwrap()
            .then(() => { })
            .catch((error) => {
                console.log("HandleDeleteProject error: " + error)
            })
        router.push('/');
    }

    const HandleRenameProject = (e) => {
        let projectData = { "projectId": props.id, "name": rename }
        renameProject(projectData)
            .unwrap()
            .then(() => { })
            .catch((error) => {
                console.log("HandleRenameProject error: " + error)
            })
            setRename("")
    }

    return (
        <div>
            <div className={styles.projectName}><label htmlFor='rename'>New project name: </label> <input name='rename' value={rename} onChange={(e) => setRename(e.target.value)} /> <button onClick={(e) => HandleRenameProject(e)}>Rename this project</button></div>
            <button className={styles.deleteButton} onClick={() => HandleDeleteProject()}>Delete this project</button>
        </div>
    )
}