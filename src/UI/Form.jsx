import React from 'react'

export default function Form({onSubmit,children,className}) {
  return (
    <form className={className} onSubmit={onSubmit}>
            {children}
    </form>
  )
}
