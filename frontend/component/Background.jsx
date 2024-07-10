import React from 'react';
import image from "../asset/background.jpg"

function Background() {
  return (
    <div>
      <img className='h-screen w-screen' src={image} alt='background' />
      </div>
  )
}

export default Background