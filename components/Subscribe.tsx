
import { useState } from 'react'
// @ts-ignore
import { useWallet } from 'use-wallet'
import { useUser } from '../lib/hooks'
import Button from './Button'

export default function Subscribe(props: any) {
    const [dai, setDai] = useState(0)
    const { user } = useUser()
    const wallet = useWallet()

    const buttonLabel = wallet.status === "connected" ? "Connected" : "Connect Wallet"

    const handleApprove = () => {
        console.log("Approving...");
        // TODO
        // Pop up toast if approve succeeds, fail toast if it fails
        console.log("Approved");
    }

    const handlePay = () => {
        console.log("Paying...");
        // TODO
        // check if DAI approved on Ferry for amount specified - popup fail if not
        // wait for payment to go through
        // after tx succeeds, set subscription length in Fauna
        console.log("Paid");
    }

    return (
        <>
            <input type="text" value={dai} />

            {/* shows you time subscribed for based on DAI paid */}

            <Button onClick={handleApprove}>Approve</Button>
            <Button onClick={handlePay}>Pay</Button>
        </>
    )
}