import Image from 'next/image'
import spinner from '../public/spinner.gif'

export default function Spinner() {
  return (
    <div>
      <Image
        src={spinner}
        alt="loading animation"
        className="ferry-spinner"
      />
    </div>
  )
}