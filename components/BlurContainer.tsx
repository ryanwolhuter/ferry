import styles from '../styles/BlurContainer.module.css'

type Props = {
  children: JSX.Element,
  isFullScreen?: boolean,
  isBackground?: boolean
}

export default function BlurContainer({ children, isFullScreen, isBackground }: Props) {

  return <div className={styles.container}>
    {children}
    <style jsx>{`
      div {
        padding: ${isFullScreen ? '0' : '32'}px;
        border-radius: ${isFullScreen ? '0' : '30'}px;
        backdrop-filter: ${isBackground || isFullScreen ? 'blur(70px)' : 'blur(140px)'};
        grid-column-start: 1;
        grid-row-start: 1;
        grid-row-end: 1;
        grid-column-end: ${isBackground ? '4' : '1'};
        z-index: ${isBackground ? -1 : 1};
      }
    `}</style>
  </div>
}