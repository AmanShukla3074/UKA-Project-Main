import React from 'react'
import { AlbumContainer, HomeMusic } from '../../Components'
import MusicContainer from '../../Components/Music_Streaming/MusicContainer/MusicContainer'

const MusicHome = () => {
  return (
    <div>
      <HomeMusic/>
      <MusicContainer/>
      <AlbumContainer/>
    </div>
  )
}

export default MusicHome
