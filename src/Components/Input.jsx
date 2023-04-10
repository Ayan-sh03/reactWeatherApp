import React from 'react'

const Input = () => {
  return (
    <div className='input'>
      <input
            name="city-name"
            placeholder='Enter City Name'
            id='city-name'
            className='cityName'
            onChange={handleInput}
          />
    </div>
  )
}

export default Input
