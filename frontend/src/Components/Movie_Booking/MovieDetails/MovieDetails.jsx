import React, { useState, useEffect } from "react";
import { useParams ,useHistory, useNavigate} from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";
import Movie_Item from "../Movie_Item/Movie_Item";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [data, setData] = useState({});
  const [recomendationmovie, setRecomendationmovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/Movie/movies/${movieId}/`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [movieId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/Movie/movies/`
        );
        setRecomendationmovie(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //   if (data) {
  //     return <div>Loading...</div>;
  //   }

  const baseUrl = "http://127.0.0.1:8000";
  const firstImage =
    data.images && data.images.length > 0
      ? `${baseUrl}${data.images[0].img}`
      : "";

  const genres =
    data.genre && data.genre.map((genre) => genre.Genre_ID.Genre_Name);
  const language =
    data.language &&
    data.language.map((genre) => genre.Language_ID.Language_Name);
  const type = data.type && data.type.map((genre) => genre.Type_ID.Type_Name);
 
  const cast=data.cast;
  const director=data.director;
  const producer=data.producer;


  const navigate = useNavigate();

  const navigateToAnotherRoute = () => {
    // Replace '/path-to-another-route' with the actual path you want to navigate to
    navigate('/moviebooking/theater');
  };

  return (
    <>
      <div className="movie-container">
        <div className="movie-details-container">
          <div className="img">
            <img src={firstImage} alt={firstImage} className="movie-poster" />
          </div>
          <div className="movie-info">
            <h1 className="movie-title">{data.M_Name}</h1>
            <p className="movie-duration">Duration : {data.M_Duration}</p>
            <p className="movie-release-date">
              Release Date : {data.M_ReleaseDate}
            </p>
            {/* <p className="movie-genre">{data.genre}</p> */}
            <div className="movie-genre">
              <div className="genres">
                {" "}
                Genres :
                {genres &&
                  genres.map((genre, index) => (
                    <span className="genre" key={index}>
                      {genre}{" "}
                    </span>
                  ))}
              </div>
            </div>
            <div className="movie-language">
              <div className="languages">
                {" "}
                Languages :
                {genres &&
                  language.map((language, index) => (
                    <span className="genre" key={index}>
                      {language}
                      {"  "}
                    </span>
                  ))}
              </div>
            </div>
            <div className="movie-type">
              <div className="type">
                {" "}
                Type :
                {genres &&
                  type.map((type, index) => (
                    <span className="genre" key={index}>
                      {type}
                      {"  "}
                    </span>
                  ))}
              </div>
            </div>

            <p className="movie-certification">
              Age Certification: {data.M_Age_Certification}
            </p>
            <p className="movie-description">
              Synopsis: <br />
              {data.M_Synopsis}
            </p>
            <button onClick={navigateToAnotherRoute}>BOOK TICKETS</button>
          </div>
        </div>
      </div>
     

      <div className="castAndCrew">
        <h1>Cast and crew</h1>
         
          <h2>Cast</h2>
        <div className="cast-container">
  
          <div className="cast-scroll-container">
            {cast && cast.map((castMember) => (
              <div className="cast-card" key={castMember.MCast_ID}>
                <div className="img">
                <img
                  src={`http://127.0.0.1:8000${castMember.Cast_ID.Cast_img}`}
                  alt={castMember.Cast_ID.Cast_Name}
                />
                </div>
                <div className="cast-details">
                  <h3>{castMember.Cast_ID.Cast_Name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
         
          <h2>Directors - Producers</h2>
        <div className="cast-container">
  
          <div className="cast-scroll-container">
            {director && director.map((castMember) => (
              <div className="cast-card" key={castMember.Md_ID}>
                <div className="img">
                <img
                  src={`http://127.0.0.1:8000${castMember.Director_ID.Director_img}`}
                  alt={`${castMember.Director_ID.Director_Name}`}
                />
                </div>
                <div className="cast-details">
                  <h3>{castMember.Director_ID.Director_Name}</h3>
                  <p>Director</p>
                </div>
              </div>
            ))}
            {producer && producer.map((castMember) => (
              <div className="cast-card" key={castMember.Mp_ID}>
                <div className="img">
                <img
                  src={`http://127.0.0.1:8000${castMember.Producer_ID.Producer_img}`}
                  alt={`${castMember.Producer_ID.Producer_Name}`}
                />
                </div>
                <div className="cast-details">
                  <h3>{castMember.Producer_ID.Producer_Name}</h3>
                  <p>Producer</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="recomendationmovie">
        <h1>Movies</h1>
        <div className="container">
          {recomendationmovie.slice(0, 4).map((item) => (
            <div
              key={item.M_ID}
              onClick={() => window.open(`${item.M_ID}`, "_blank")}
            >
              <Movie_Item
                id={item.M_ID}
                name={item.M_Name}
                images={item.images}
                genre={item.genre}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const MyComponent = () => {
//   const navigate = useNavigate();

//   const navigateToAnotherRoute = (id) => {
//     // Replace '/path-to-another-route' with the actual path you want to navigate to
//     navigate(`/path-to-another-route/${id}`);
//   };

//   return (
//     <div>
//       <p>Your component content goes here.</p>
//       <button onClick={() => navigateToAnotherRoute(123)}>Go to Another Route with ID 123</button>
//       {/* Replace 123 with the actual ID you want to pass */}
//     </div>
//   );
// };

// export default MyComponent;
