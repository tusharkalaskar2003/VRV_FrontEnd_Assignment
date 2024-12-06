import React from 'react'
import './DashBoard.css'

export default function DashBoard({children}) {
  return (
    <>
        <div className='dashboard'> 
            {children}
        </div>
    </>
  )
}
