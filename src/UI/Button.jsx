import React from 'react'

export default function Button({children,className,onSubmit}) {
  return (
    <button onClick={onSubmit} className={className}>{children}</button>
  )
}
