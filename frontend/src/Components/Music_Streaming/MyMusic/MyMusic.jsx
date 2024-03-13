


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MusicItem from '../MusicItem/MusicItem';
import './MyMusic.css'
import AuthContext from '../../../Context/AuthContext'

const MyMusic = () => {
 const [musicData, setMusicData] = useState([]);
 const { authTokens } = useContext(AuthContext);
 useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/Music/music/',
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        setMusicData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching music data:', error);
      }
    };

    fetchMusicData();
 }, []);

 return (
    <div>
      <h1>My Music</h1>
      <div className='musicContainer'>
      {musicData.map((item) => (
        <MusicItem 
          key={item.Music_ID}
          id={item.Music_ID}
          name={item.Music_Title}
          image={item.cover}
          artist={item.Artist}
          item={item}
        />
      ))}
      </div>
    </div>
 );
};

export default MyMusic;

