import React, { useContext } from 'react'
import './MusicItem.css'
import songContext from '../../../Context/songContext'
const MusicItem = ( {id, name, image,artist,item}) => {
  const { setCurrentSong} = useContext(songContext);

  const baseUrl = "http://127.0.0.1:8000";
  if (!image.startsWith(baseUrl)) {
     // If not, prepend the base URL to image
     image = baseUrl + image;
  }

  return (
    <>
       <div className='music-item'
         onClick={() => {
          setCurrentSong(item);
      }}
       >
        <div className="music-img-container">
          <img className="music-img" src={image}  />
        </div>
        <div className="musicDetails">
        <div className='MusicTitle'>{name}</div>
        <div className='musicArtists'>
          {artist.map((artistItem, index) => (
            <div key={artistItem.Artist_ID} className='artist-info'>
              {artistItem.Artist_Name}
            </div>
          ))}
        </div>
        </div>
      </div>
    </>
  )
}

export default MusicItem
