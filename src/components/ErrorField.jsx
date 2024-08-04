import React from 'react'

export default function ErrorField({errorMsg }) {
  return (
    <p className='text-xs font-semibold mr-2 text-red-600  '>
        {errorMsg}
    </p>
  )
}
