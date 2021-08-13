// @ts-ignore
import classNames from 'classnames'
import { useState } from 'react'

export default function Button(props: any) {
  const { className, ...otherProps } = props
  const [isSelected, setIsSelected] = useState(false)

  return (
    <>
      <button
        onClick={e => setIsSelected(true)}
        className={classNames(className, isSelected && 'selected')}
        {...otherProps} />
    </>
  )
}