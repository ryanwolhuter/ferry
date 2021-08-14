// @ts-ignore
import classNames from 'classnames'
import { useState } from 'react'

export default function WalletButton(props: any) {
  const { className, ...otherProps } = props
  const [isSelected, setIsSelected] = useState(false)

  const label = props.activating
    ? "connecting..."
    : props.active
      ? "connected"
      : `connect ${props.name}`;

  const handleClick = () => {
    console.log("Connecting wallet...");
    props.connectFunction && props.connectFunction();
  };

  return (
    <div className="WalletButtonContainer">
      <button className="WalletButton" onClick={handleClick}>
        <p>{label}</p>
        {/* <Icon className={classes.WalletIcon} /> */}
      </button>
    </div>
  )
}
