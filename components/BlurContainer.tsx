import styles from '../styles/BlurContainer.module.css'

type Props = {
  children: JSX.Element,
  isFullScreen?: boolean
}

export default function BlurContainer({ children, isFullScreen }: Props) {

  return <div className={styles.container}>
    {children}
    <style jsx>{`
      div {
        padding: ${isFullScreen ? '0' : '32'}px;
        border-radius: ${isFullScreen ? '0' : '30'}px;
      }
    `}</style>
  </div>
}