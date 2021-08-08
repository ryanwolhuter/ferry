import classNames from 'classnames'

export default function Button(props) {
  const { className, isActive, ...otherProps } = props

  return (
    <>
    <button className={classNames(className, isActive && 'active')} {...otherProps} />
    </>
  )
}