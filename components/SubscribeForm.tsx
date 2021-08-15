
import { useState } from 'react'
import Progress from './Progress'
import styles from '../styles/UploadForm.module.css'
import BlurContainer from './BlurContainer'
import Button from './Button'
import { useRouter } from 'next/router'
import { DaiPricePerMonth, maxSubscribeMonths } from '../constants/chain'
import { approveDaiFerry, paySubscription } from '../lib/contracts/ContractFunctions'
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
      console.log(status);
      const res = await paySubscription(contracts.ferryContract, provider.selectedAddress, cost)
      // TODO check if error / paid
      setStatus("PAID")
      console.log(status);
    } else {
      setStatus("CONNECT WALLET")
    }
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
              type="number"
              name="subscriptionDuration"
              className={styles.email}
              onChange={handleMonthsChange}
              value={months}
            ></input>
            <h2>{getCostString()}</h2>
            <hr className={styles.divider} />
          </div>
          <div className="buttonsContainer">
            <Button className="default" onClick={(e) => handleApprove(e)}>Approve</Button>
            <Button className="secondary" onClick={(e) => handlePay(e)}>Pay {getCostString()}</Button>
          </div>
        </form>
      </BlurContainer>
      {!isLoading && (
        <BlurContainer isBackground>
          <div className={styles.progressContainer}>
            <Image src={spinner} alt="loading animation" />
            {/* <Progress progress={20} radius={100} stroke={10} /> */}
            {/* 0. Show connect wallet if no contracts/provider */}
            {/* 1. Approving spinner */}
            {/* 2. Paying spinner */}
            {/* 3. Success check */}
            {/* 3b. Failed cross */}
          </div>
        </BlurContainer>
      )}
    </div>
  )
}