import React from 'react'

export default function ErrorField({errorMsg ,className}) {
  return (
    <p className= 'text-sm font-semibold mr-2 text-red-600'>
        {errorMsg}
    </p>
  )
}
