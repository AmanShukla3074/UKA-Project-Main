import React from 'react'
import './MusicItem.css'
const MusicItem = ( {id, name, image,artist,item}) => {
  console.log(item);
  return (
    <>
       <div className='music-item'>
        <div className="music-img-container">
          <img className="music-img" src={image}  />
        </div>
        <div className="musicDetails">
        <div className='MusicTitle'>{name}</div>
        <div className='musicArtists'>
          {artist.map((artistItem, index) => (
            <div key={artistItem.Artist_ID} className='artist-info'>
              {artistItem.Artist_Name}
              {/* <h3 className='musicArtistName'>{artistItem.Artist_Name}</h3> */}
            </div>
          ))}
        </div>
        </div>
      </div>
    </>
  )
}

export default MusicItem
