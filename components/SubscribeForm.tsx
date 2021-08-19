
import { useState, useEffect } from 'react'
import Progress from './Progress'
import styles from '../styles/UploadForm.module.css'
import BlurContainer from './BlurContainer'
import Button from './Button'
import { useRouter } from 'next/router'
import { DaiPricePerMonth, maxSubscribeMonths } from '../constants/chain'
import { approveDaiFerry, getSubscriptionEnd, paySubscription } from '../lib/contracts/ContractFunctions'
import Image from 'next/image'
import spinner from '../public/spinner.gif'

export default function SubscribeForm(props: any) {
  const { provider, contracts } = props
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState("START")
  const [statusMessage, setStatusMessage] = useState("Enter details, approve, and pay")
  const [months, setMonths] = useState(1)
  const [cost, setCost] = useState(1 * DaiPricePerMonth)
  const router = useRouter()

  useEffect(() => {
    if (provider && provider.selectedAddress) {
      setStatus("START")
    }
  }, [provider])

  const handleMonthsChange = (e: any) => {
    let m = 1
    if (e.target.value) m = Math.floor(parseInt(e.target.value))
    m = (m < 1) ? 1 : m
    m = (m > maxSubscribeMonths) ? maxSubscribeMonths : m
    setMonths(m)
    setCost(m * DaiPricePerMonth)
  }

  const getCostString = () => {
    return `$${cost}.00`
  }

  const handleApprove = async (e: any) => {
    e.preventDefault()
    if (provider && provider.selectedAddress && contracts && contracts.daiContract) {
      setStatus("APPROVING")
      console.log(status);
      const res = await approveDaiFerry(contracts.daiContract, provider.selectedAddress, cost)
      // TODO check if error / approved
      setStatus("APPROVED")
      console.log(status);
    } else {
      setStatus("CONNECT WALLET")
    }
  }

  const handlePay = async (e: any) => {
    e.preventDefault()
    if (provider && provider.selectedAddress && contracts && contracts.ferryContract) {
      setStatus("PAYING")
      console.log(status)
      const res = await paySubscription(contracts.ferryContract, provider.selectedAddress, cost)
      await handleSubscribe(provider, contracts)
      // TODO check if error / paid
      setStatus("PAID")
      // TODO add time delay
      console.log(status);
      router.push('/dashboard')
    } else {
      setStatus("CONNECT WALLET")
    }
  }

  async function handleSubscribe(provider, contracts) {

    const expiration = (await getSubscriptionEnd(contracts.ferryContract, provider.selectedAddress) ?? 0).toString()

    console.log("Expiry:", expiration);

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

  const renderHintPanel = () => {
    if (status == "START") {
      return (
        <div className='helper-text-in-pay'>
          <h2>Choose the duration of your subscription then click Approve</h2>
        </div>
      )
    } else if (status == "CONNECT WALLET") {
      return (
        <div>
          <h2>Please connect your wallet</h2>
        </div>
      )
    } else if (status == "APPROVING") {
      return (
        <div>
          <h2>Approving...</h2>
          <div style={{
            width: "200px",
            marginLeft: "250px",
            marginTop: "32px"
          }}>
            <Image className="ferry-spinner" src={spinner} alt="loading animation" />
          </div>
        </div>
      )
    } else if (status == "APPROVED") {
      return (
        <div>
          <h2>Click Pay to complete your purchase</h2>
        </div>
      )
    } else if (status == "PAYING") {
      return (
        <div>
          <h2>Paying...</h2>
          <div style={{
            width: "200px",
            marginLeft: "250px",
            marginTop: "32px"
          }}>
            <Image className="ferry-spinner" src={spinner} alt="loading animation" />
          </div>
        </div>
      )
    } else if (status == "PAID") {
      return (
        <div>
          <h2>Successfully subscribed! 🎉</h2>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Choose the duration of your subscription then click Approve</h2>
        </div>
      )
    }
  }

  return (
    <div className={styles.formContainer}>
      <BlurContainer>
        <form onSubmit={e => { console.log("hello") }} className={styles.form}>
          {/* <button type="button" onClick={e => handleSubscribe()}>subscribe</button> */}
          <div className={styles.fileInputContainer}>
            <div className={styles.details}>
              <h1 className={styles.heading}>Buy a Subscription</h1>
              <p className={styles.spaceUsed}>You will be charged in DAI</p>
            </div>
          </div>
          <div className={styles.container}>
            <label htmlFor="subscriptionDuration">
              Duration in months
            </label>
            <input
              style={{
                width: "100%"
              }}
              type="number"
              name="subscriptionDuration"
              className={styles.email}
              onChange={handleMonthsChange}
              value={months}
            ></input>
            <hr className={styles.divider} />
            <div style={{
              display: 'flex',
              justifyContent: "space-between"
            }}>
              <h2 style={{ textAlign: "justify" }}>Total</h2>
              <h2 style={{ textAlign: "justify" }}>{getCostString()}</h2>
            </div>


          </div>
          <div className="buttonsContainer">
            <Button className="default" onClick={(e) => handleApprove(e)}>Approve</Button>
            <Button className="secondary" onClick={(e) => handlePay(e)}>Pay {getCostString()}</Button>
          </div>
        </form>
      </BlurContainer>
      {!isLoading && (
        <BlurContainer isBackground>
          <div className={styles.progressContainer} style={{
            marginLeft: '460px',
            zIndex: 10,
          }}>
            {renderHintPanel()}
          </div>
        </BlurContainer>
      )}
    </div>
  )
}