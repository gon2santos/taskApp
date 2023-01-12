import styles from '../styles/Home.module.css';
import Link from 'next/link'

export default function Slot(props) {
    return (
        <>
        <Link
            href={"/" + props.linkSrc}
            className={styles.card}
          >
            {props.title ? <h3>{props.title} &rarr;</h3> : <><h3>New Project +</h3> <p>Click here to add a new project</p></>}
            </Link>
        </>
    )
}