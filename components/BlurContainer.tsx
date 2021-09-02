import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  isFullScreen?: boolean
  isBackground?: boolean
  className?: string
}

export default function BlurContainer({ children, isFullScreen, isBackground, className }: Props) {

  return <div className={`blurContainer ${className}`}>
    {children}
    <style jsx>{`
      div.blurContainer {
        padding: ${isFullScreen ? '0' : '32'}px;
        border-radius: ${isFullScreen ? '0' : '30'}px;
        backdrop-filter: ${isBackground || isFullScreen ? 'blur(70px)' : 'blur(140px)'};
        grid-column-start: 1;
        grid-row-start: 1;
        grid-row-end: 1;
        grid-column-end: ${isBackground ? '4' : '1'};
        z-index: ${isBackground ? -1 : 1};
        background: rgba(251, 251, 251, 0.05);
        box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.25), inset 0px 0px 8px rgba(255, 255, 255, 0.29);
        transition: all 0.4s ease-in-out;
      }
      div.hide {
        width: 0;
        opacity: 0;
      }
      div.show {
        width: 100%;
        opacity: 1;
      }
    `}</style>
  </div>
}