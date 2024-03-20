import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AuthContext from '../../../Context/AuthContext'; // Adjust the import path as necessary
import './ECOrderDetail.css';

const ECOrderDetail = () => {
 const { orderdetailsId } = useParams();
 const [orderDetails, setOrderDetails] = useState([]);
 const [orderInfo, setOrderInfo] = useState({}); // State to hold order info
 const { authTokens } = useContext(AuthContext);

 useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/EC/order/${orderdetailsId}/`, {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
          },
        });
        if (response.status === 200) {
          setOrderDetails(response.data.order_details || []);
          setOrderInfo({
            totalAmount: response.data.Total,
            orderDate: response.data.OrderDate,
            orderStatus: response.data.Status_ID.Status_Name,
          });
        } else {
          throw new Error('Failed to fetch order details');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
 }, [orderdetailsId, authTokens]);

 if (!orderDetails.length) {
    return <div>Loading...</div>;
 }

 return (
    <div className="order-details">
      <h2>Order Details</h2>
      <p>Order ID: {orderdetailsId}</p>
      <p>Order Date: {new Date(orderInfo.orderDate).toLocaleDateString()}</p>
      {/* <p>Status: {orderInfo.orderStatus}</p> */}
      <p>Total Amount: {'\u20B9'}{orderInfo.totalAmount}</p>
      {orderDetails.map((detail, index) => (
        <div key={index} className="order-detail-item">
          <div className="orderdetailsimgwrapper">
            <img src={`http://127.0.0.1:8000${detail.P_ID.Images[0].img}`} alt={detail.P_ID.P_Name} className="order-detail-product-image" />
          </div>
          <div className="product-info">
            <h3 className='order-detail-h3'>{detail.P_ID.P_Name}</h3>
            <p className='order-detail-p'>Price: ${detail.P_ID.P_Price}</p>
            <p className='order-detail-p'>Quantity: {detail.ItemQuantity}</p>
            <p className='order-detail-p'>Subtotal: {'\u20B9'}{detail.Subtotal}</p>
          </div>
        </div>
      ))}
    </div>
 );
};

export default ECOrderDetail;


// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import AuthContext from '../../../Context/AuthContext'; // Adjust the import path as necessary
// import './ECOrderDetail.css';

// const ECOrderDetail = () => {
//  const { orderdetailsId } = useParams();
//  const [orderDetails, setOrderDetails] = useState([]);
//  const { authTokens } = useContext(AuthContext);

//  useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/EC/order/${orderdetailsId}/`, {
//           headers: {
//             Authorization: `Bearer ${authTokens?.access}`,
//           },
//         });
//         if (response.status === 200) {
//           setOrderDetails(response.data.order_details || []);
//         } else {
//           throw new Error('Failed to fetch order details');
//         }
//       } catch (error) {
//         console.error('Error fetching order details:', error);
//       }
//     };

//     fetchOrderDetails();
//  }, [orderdetailsId, authTokens]);

//  if (!orderDetails.length) {
//     return <div>Loading...</div>;
//  }

//  return (
//     <div className="order-details">
//       {orderDetails.map((detail, index) => (
//         <div key={index} className="order-detail-item">
//             <div className="orderdetailsimgwrapper">

//           <img src={`http://127.0.0.1:8000${detail.P_ID.Images[0].img}`} alt={detail.P_ID.P_Name} className="order-detail-product-image" />
//             </div>
//           <div className="product-info">
//             <h3 className='order-detail-h3'>{detail.P_ID.P_Name}</h3>
//             <p className='order-detail-p'>Price: ${detail.P_ID.P_Price}</p>
//             <p className='order-detail-p'>Quantity: {detail.ItemQuantity}</p>
//             <p className='order-detail-p'>Subtotal: {'\u20B9'}{detail.Subtotal}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//  );
// };

// export default ECOrderDetail;



