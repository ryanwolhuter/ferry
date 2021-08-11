import styles from '../styles/BlurContainer.module.css'

export default function BlurContainer({ children }: { children: JSX.Element }) {

  return <div className={styles.container}>{children}</div>
}