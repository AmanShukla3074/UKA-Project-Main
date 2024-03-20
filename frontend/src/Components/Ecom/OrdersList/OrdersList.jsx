import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../../Context/AuthContext'; // Adjust the import path as necessary
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './OrdersList.css';

const OrdersList = () => {
 const { authTokens } = useContext(AuthContext);
 const [orders, setOrders] = useState([]);

 // Define the formatDate function
 const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
 };

 useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/EC/order/', {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        });

        if (response.status === 200) {
          setOrders(response.data);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
 }, [authTokens]);

 return (
    <div className='orderlist-wrapper'>
      {orders.map(order => (
        <div key={order.OrderID} className="order-container">
          <h2>Order ID: {order.OrderID}</h2>
          <p>Order Date: {formatDate(order.OrderDate)}</p> {/* Use the formatDate function here */}
          <p>Status Name: {order.Status_ID.Status_Name}</p>
          <p>Total Amount: ${order.Total}</p>
          <Link to={`/ecommerce/orderdetails/${order.OrderID}`}>View Details</Link>
        </div>
      ))}
    </div>
 );
};

export default OrdersList;

 
 
// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import AuthContext from '../../../Context/AuthContext'; // Adjust the import path as necessary
// import './OrdersList.css'
// const OrdersList = () => {
//  const { authTokens } = useContext(AuthContext); // Access the authTokens from the AuthContext
//  const [orders, setOrders] = useState([]);

//  useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/EC/order/', {
//           headers: {
//             Authorization: `Bearer ${authTokens?.access}`, // Use the access token from authTokens
//           },
//         });

//         if (response.status === 200) {
//           setOrders(response.data);
//         } else {
//           throw new Error('Failed to fetch orders');
//         }
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     fetchOrders();
//  }, [authTokens]);

//  return (
//     <div className='orderlist-wrapper'>
//        {orders.map(order => (
//          <div key={order.OrderID} className="order-container">
//            <h2>Order ID: {order.OrderID}</h2>
//            {/* <p>Order Status: {order.someObject.Status_ID ? order.someObject.Status_ID : 'Pending'}</p> */}
//            <p>Status Name: {order.Status_ID.Status_Name}</p>
           
//           {/* <p>Order Status: {order.Status_ID ? 'Determined Status Name' : 'Pending'}</p> */}
//            <p>Total Amount: ${order.Total}</p>
//          </div>
//        ))}
//     </div>
//    );
   
// };

// export default OrdersList;
