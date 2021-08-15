
import { useState } from 'react'
import Progress from './Progress'
import styles from '../styles/UploadForm.module.css'
import BlurContainer from './BlurContainer'
import { useRouter } from 'next/router'


export default function SubscribeForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  function handleSubmit(e: any) {

  }

  async function handleSubscribe() {
    const expiration = Date.now() + (30 * 24 * 60 * 60 * 1000)
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ expiration })
      })
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.formContainer}>
      <BlurContainer>
        <form onSubmit={e => handleSubmit(e)} className={styles.form}>
          {/* <button type="button" onClick={e => handleSubscribe()}>subscribe</button> */}
          <div className={styles.fileInputContainer}>
            <input
              type="file"
              name="file"
            ></input>
            <label htmlFor="file" aria-hidden={true}>
              Choose file
            </label>
            <div className={styles.details}>
              <h1 className={styles.heading}>Buy a Subscription</h1>
              <p className={styles.spaceUsed}>You will be charged in Dai</p>
            </div>
          </div>
          <div className={styles.container}>
            <label htmlFor="subscriptionDuration">
              Duration in months
            </label>
            <input
              type="number"
              name="subscriptionDuration"
              className={styles.email}
            ></input>
            <hr className={styles.divider} />
          </div>
          <button
            type="button"
            onClick={e => router.push('/dashboard')}
            className={`${styles.submitButton} default`}
          >Dashboard
          </button>
        </form>
      </BlurContainer>
      {!isLoading && (
        <BlurContainer isBackground>
          <div className={styles.progressContainer}>
            <Progress progress={20} radius={100} stroke={10} />
          </div>
        </BlurContainer>
      )}
    </div>
  )
}