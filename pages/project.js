import styles from '../styles/Home.module.css';
import Link from 'next/link'

export default function Project(props) {
    return (
        <>
        <h1 className={styles.title}>
          Add a new project
        </h1>

        <Link
            href={"/"}
          >
            <h1>Home &rarr;</h1>
            </Link>

        </>
    )
}