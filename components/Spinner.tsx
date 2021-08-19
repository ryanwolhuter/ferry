import Image from 'next/image'
import spinner from '../public/spinner.gif'

export default function Spinner() {
  return (
    <div className="spinner">
      <Image
        src={spinner}
        alt="loading animation"
      />
    </div>
  )
}