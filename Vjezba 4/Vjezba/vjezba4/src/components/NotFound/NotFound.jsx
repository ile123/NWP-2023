import styles from './NotFound.module.css'

export default function NotFound() {
    return(
        <>
            <h1 id={styles.notFound}>Given plane has no end point, sorry.</h1>
        </>
    );
}