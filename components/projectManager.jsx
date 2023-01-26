import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProjects } from '../redux/slice';
import { useRouter } from 'next/router'
import { useDeleteProjectMutation, useRenameProjectMutation } from '../redux/apiSlice';

export default function ProjectManager(props) {
    const dispatch = useDispatch();
    const { updatePrj } = useSelector((state) => state.project);
    const [rename, setRename] = useState("")
    const router = useRouter()
    const [deleteProject, response_delete] = useDeleteProjectMutation()
    const [renameProject, response_rename] = useRenameProjectMutation()

    const HandleDeleteProject = () => {
        let projectData = { "projectId": props.id, "email": localStorage.getItem("userEmail") }
        deleteProject(projectData)
            .unwrap()
            .then(() => {
                dispatch(updateProjects(!updatePrj));
                alert("Project deleted");
                router.push('/');
            })
            .catch((error) => {
                console.log("HandleDeleteProject error: " + error)
            })
    }

    const HandleRenameProject = (e) => {
        let projectData = { "projectId": props.id, "name": rename }
        renameProject(projectData)
            .unwrap()
            /* .then(() => {dispatch(updateProjects(!updatePrj))}) */
            .catch((error) => {
                console.log("HandleRenameProject error: " + error)
            })
        setRename("")
    }

    return (
        <div className={styles.projMan}>
            <div className={styles.renameProjContainer}>
                <label htmlFor='rename'>Rename Project: </label>
                <input className={styles.projManRenameInput} name='rename' value={rename} onChange={(e) => setRename(e.target.value)} />
                <button onClick={(e) => HandleRenameProject(e)}>Done</button>
            </div>
            <button className={styles.deleteButton} onClick={() => HandleDeleteProject()}>Delete project</button>
        </div>
    )
}