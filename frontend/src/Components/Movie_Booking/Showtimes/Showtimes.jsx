import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Showtimes.css";
import { useParams } from "react-router-dom";

const Showtimes = () => {
  const [showtimes, setShowtimes] = useState([]);
  const { movieId,movieType,movieLang } = useParams();
  
  useEffect(() => {
    const fetchShowtimes = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/api/Movie/showtimes/?movie_type=${movieType}&language=${movieLang}&movie=${movieId}`);
      setShowtimes(response.data);
    };

    fetchShowtimes();
  }, []);
 console.log(showtimes);
  return (
  
    <></>
  
  );
};

export default Showtimes;