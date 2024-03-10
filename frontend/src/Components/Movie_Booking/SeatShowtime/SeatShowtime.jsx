// SeatShowtime.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./SeatShowtime.css"; // Import your CSS file

const SeatShowtime = () => {
  const { showtimeId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/Movie/showtimes/${showtimeId}/seats/`
        );
        setSeats(response.data);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, [showtimeId]);

  // Group seats by seat type and row
  const seatsByTypeAndRow = seats.reduce((acc, seat) => {
    const seatType = seat.seat.Seat_Type.Seat_type_Name;
    const row = seat.seat.Seat_Row_AlphaBet;

    if (!acc[seatType]) {
      acc[seatType] = {};
    }

    if (!acc[seatType][row]) {
      acc[seatType][row] = [];
    }

    acc[seatType][row].push(seat);
    return acc;
  }, {});

  const handleSeatClick = (seat) => {
    if (!seat.is_booked) {
      // Toggle seat selection
      setSelectedSeats((prevSelectedSeats) => {
        const isSelected = prevSelectedSeats.includes(seat.id);
        const updatedSelectedSeats = isSelected
          ? prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seat.id)
          : [...prevSelectedSeats, seat.id];

        console.log(updatedSelectedSeats);
        return updatedSelectedSeats;
      });
    }
  };

  const isSeatSelected = (seat) => {
    return selectedSeats.includes(seat.id);
  };

  // return (
  //   <div className="seat-showtime-container">
  //     <h2>Seat Selection</h2>
  //     {Object.entries(seatsByTypeAndRow).map(([seatType, rows]) => (
  //       <div key={seatType} className="seat-type">
  //         <p className="seat-type-label">{seatType} - {rows[Object.keys(rows)[0]][0].Price}</p>
  //         {Object.entries(rows).map(([row, seatsInRow]) => (
  //           <div key={row} className="seat-row">
  //             <p className="row-label">{row}</p>
  //             <div className="showtime-details">
  //               {seatsInRow.map((seat) => (
  //                 <div
  //                   key={seat.id}
  //                   className={`showtime-item ${
  //                     seat.is_booked ? "booked" : "available"
  //                   } ${isSeatSelected(seat) ? "selected" : ""}`}
  //                   onClick={() => handleSeatClick(seat)}
  //                 >
  //                   <p
  //                     className={`seat-number ${
  //                       isSeatSelected(seat) ? "selected" : ""
  //                     }`}
  //                   >
  //                     {seat.seat.Seat_Col_Num}
  //                   </p>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     ))}
  //   </div>
  // );
// Inside your SeatShowtime component
return (
  <div className="seat-showtime-container">
     <h2>Seat Selection</h2>
     {Object.entries(seatsByTypeAndRow).map(([seatType, rows]) => (
       <div key={seatType} className="seat-type">
         <p className="seat-type-label">{seatType} - {rows[Object.keys(rows)[0]][0].Price}</p>
         {Object.entries(rows).map(([row, seatsInRow]) => (
           <div key={row} className="seat-row">
             <p className="row-label">{row}</p>
             <div className="showtime-details">
               {seatsInRow.map((seat) => (
                 <div
                  key={seat.id}
                  className={`showtime-item ${isSeatSelected(seat) ? "selected" : ""}`}
                  onClick={() => handleSeatClick(seat)}
                 >
                  <p
                     className={`seat-number ${
                       isSeatSelected(seat) ? "selected" : ""
                     } ${seat.is_booked ? "booked" : ""}`}
                  >
                     {seat.seat.Seat_Col_Num}
                  </p>
                 </div>
               ))}
             </div>
           </div>
         ))}
       </div>
     ))}
  </div>
 );
 

};

export default SeatShowtime;