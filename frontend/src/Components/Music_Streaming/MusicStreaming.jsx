import React from 'react'
import './MusicStreaming.css'
import SIdebar from './Sidebar/SIdebar'
import { Outlet } from 'react-router-dom'
import BottomBar from './BottomBar/BottomBar'
function MusicStreaming() {
  return (
    <>
    <div className='musicContain'>
      <div className="sidebar">
        <SIdebar/>
        
      </div>
      <div className="Main">
        <Outlet/>
      </div>
      </div>
      <BottomBar/>
      </>
  )
}

export default MusicStreaming
