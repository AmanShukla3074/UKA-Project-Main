import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import AuthContext from "../../../../Context/AuthContext"; // Adjust the path as necessary
import { useParams } from "react-router-dom";
import "./BookingDetails.css"; // Import the CSS file

const BookingDetails = () => {
 const { authTokens } = useContext(AuthContext);
 const [bookingDetails, setBookingDetails] = useState(null);
 const [qrData, setQrData] = useState("");
 const { bookingId } = useParams(); // Use useParams to get the bookingId

 useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/Movie/bookings/${bookingId}/`,
          {
            headers: {
              Authorization: `Bearer ${authTokens?.access}`, // Use the access token from authTokens
            },
          }
        );

        setBookingDetails(response.data);

        // Prepare data for QR code
        const qrInfo = `Booking ID: ${response.data.B_ID}, Movie Name: ${
          response.data.ShowTime_ID.M_ID.M_Name
        }, Show Time: ${response.data.ShowTime_ID.StartTime}, Date: ${
          response.data.ShowTime_ID.Date
        }, Seats: ${response.data.Seats.map(
          (seat) => seat.Seat_ID.seat.Seat_ID
        ).join(", ")}, Theater: ${
          response.data.ShowTime_ID.Screen_M.T_ID.T_Name
        }, Screen: ${response.data.ShowTime_ID.Screen_M.Screen_Name}`;
        setQrData(qrInfo);
        console.log(qrInfo);
      } catch (error) {
        console.error("Failed to fetch booking details:", error);
      }
    };

    if (authTokens && bookingId) {
      fetchBookingDetails();
    }
 }, [authTokens, bookingId]); // Corrected dependency array

 if (!bookingDetails) {
    return <div>Loading booking details...</div>;
 }

 // Extracting ticket details from the response
 const { SubTotal, gst_amount, TotalAmt } = bookingDetails;
 const showTime = bookingDetails.ShowTime_ID.StartTime;
 const [hours, minutes, seconds] = showTime.split(':');
 const date = new Date();
 date.setHours(parseInt(hours));
 date.setMinutes(parseInt(minutes));

 // Format hours to 12-hour format and determine AM/PM
 const formattedHours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
 const amPm = date.getHours() >= 12 ? 'PM' : 'AM';

 return (
    <div className="booking-details-wrapper">
      <div className="booking-details">
        <div className="booking-text-detail">
          <h2>Booking Details</h2>
          <p>Movie Name: {bookingDetails.ShowTime_ID.M_ID.M_Name}</p>
          <p>Show Time: {formattedHours}:{minutes} {amPm}</p>
          <p>Date: {bookingDetails.ShowTime_ID.Date}</p>
          <p>
            Seats:{" "}
            {bookingDetails.Seats.map(
              (seat) =>
                `${seat.Seat_ID.seat.Seat_Row_AlphaBet}${seat.Seat_ID.seat.Seat_ID}`
            ).join(", ")}
          </p>
          <p>Theater: {bookingDetails.ShowTime_ID.Screen_M.T_ID.T_Name}</p>
          <p>Screen: {bookingDetails.ShowTime_ID.Screen_M.Screen_Name}</p>
        </div>
        <div className="booking-QR-wrapper">
          <QRCode value={qrData} className="booking-QR" size={200} />
        </div>
      </div>
      <div className="ticket-details">
        <h3>Ticket Details</h3>
        <p>Total Tickets: Tickets - {bookingDetails.Seats.length}</p>
        <p>Subtotal: ${SubTotal}</p>
        <p>GST Amount: ${gst_amount}</p>
        <p>Total Amount: ${TotalAmt}</p>
      </div>
    </div>
 );
};

export default BookingDetails;

// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import QRCode from 'qrcode.react';
// import AuthContext from '../../../../Context/AuthContext'; // Adjust the path as necessary
// import { useParams } from 'react-router-dom';

// const BookingDetails = () => {
//     const { authTokens } = useContext(AuthContext);
//     const [bookingDetails, setBookingDetails] = useState(null);
//     const [qrData, setQrData] = useState('');
//     const { bookingId } = useParams(); // Use useParams to get the bookingId

//     useEffect(() => {
//         const fetchBookingDetails = async () => {
//             try {
//                 const response = await axios.get(`http://127.0.0.1:8000/api/Movie/bookings/${bookingId}/`, {
//                     headers: {
//                         'Authorization': `Bearer ${authTokens?.access}`, // Use the access token from authTokens
//                     },
//                 });

//                 setBookingDetails(response.data);

//                 // Prepare data for QR code
//                 const qrInfo = `Booking ID: ${response.data.B_ID}, Movie Name: ${response.data.ShowTime_ID.M_ID.M_Name}, Show Time: ${response.data.ShowTime_ID.StartTime}, Date: ${response.data.ShowTime_ID.Date}, Seats: ${response.data.Seats.map(seat => seat.Seat_ID.seat.Seat_ID).join(', ')}`;
//                 setQrData(qrInfo);
//                 console.log(qrInfo);

//             } catch (error) {
//                 console.error('Failed to fetch booking details:', error);
//             }
//         };

//         if (authTokens && bookingId) {
//             fetchBookingDetails();
//         }
//     }, [authTokens, bookingId]); // Corrected dependency array

//     if (!bookingDetails) {
//         return <div>Loading booking details...</div>;
//     }

//     return (
//         <div>
//             <h2>Booking Details</h2>
//             <p>Booking ID: {bookingDetails.B_ID}</p>
//             <p>Movie Name: {bookingDetails.ShowTime_ID.M_ID.M_Name}</p>
//             <p>Show Time: {bookingDetails.ShowTime_ID.StartTime}</p>
//             <p>Date: {bookingDetails.ShowTime_ID.Date}</p>
//             <p>Seats: {bookingDetails.Seats.map(seat => seat.Seat_ID.seat.Seat_ID).join(', ')}</p>
//             <QRCode value={qrData} />
//         </div>
//     );
// };

// export default BookingDetails;
