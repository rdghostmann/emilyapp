import Image from 'next/image'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex items-center justify-center'>
        <Image
            src="/images/sell.png"
            alt="Call to Action"
            width={500}
            height={300}
            className="w-1/2 shadow-lg"
        />
        <Image
            src="/images/buy.png"
            alt="Call to Action"
            width={500}
            height={300}
            className="w-1/2 shadow-lg"
        />
    </div>
  )
}

export default CallToAction
