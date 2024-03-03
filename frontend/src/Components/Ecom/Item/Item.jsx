import React from 'react'

const Item = ({ name, price, size, images }) => {
  // const firstImage = images.length > 0 ? images[1].img : '';
  const baseUrl = 'http://127.0.0.1:8000'; // Replace with your API base URL
  const firstImage = images.length > 0 ? `${baseUrl}${images[1].img}` : '';

  return (
    <div className='item'>
      <img src={firstImage} alt='aa'/>
      <h2>{name}</h2>
      <p>{price}</p>
      <p>
        {size.map((s) => (
          <span key={s.P_Size_ID}>{s.size.Size_Name} </span>
        ))}
      </p>
    </div>
  )
}

export default Item
