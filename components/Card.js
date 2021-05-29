import styles from '../styles/Card.module.css'

export default function Card(props) {
    return(
        <div className={styles.card}>
            <h2 className={styles.title}>{props.name}</h2>
            <p className={styles.para}>{props.description}</p>
            <p className={styles.useTemp}>Use Template</p>
        </div>
    )
}