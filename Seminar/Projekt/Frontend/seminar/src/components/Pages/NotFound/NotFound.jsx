import styles from './NotFound.module.css'

export default function NotFound() {
    return(
        <>
            <h1 id={styles.error}>ERROR: 404 Page Not Found</h1>
        </>
    );
}