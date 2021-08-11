import Image from 'next/image'
import background from '../public/background.png'
import styles from '../styles/Background.module.css'

export default function Background() {
  return (
    <div className={styles.bgWrap}>
      <Image
        alt="background image"
        src={background}
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </div>
  )
}