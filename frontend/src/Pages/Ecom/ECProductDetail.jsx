// ECProductDetail.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./css/ECProductDetail.css";

const ECProductDetail = () => {
  const { productId } = useParams();
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/EC/products/${productId}/`
        );
        setData(response.data);

        // Set initial selectedImage if there are images
        if (response.data.Images && response.data.Images.length > 0) {
          setSelectedImage(response.data.Images[0].img);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [productId]);

  const images = data.Images ? data.Images : [];

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  return (
    <div className="product-container">
      <div className="imgsmain">
        <div className="main-image-container">
          <img
            src={`http://127.0.0.1:8000${selectedImage}`}
            alt="Main"
            className="main-image"
          />
        </div>
        <div className="thumbnail-container">
          {images.map((image) => (
            <img
              key={image.Img_id}
              src={`http://127.0.0.1:8000${image.img}`}
              alt={`Thumbnail ${image.Img_id}`}
              className={`thumbnail ${
                selectedImage === image.img ? "active" : ""
              }`}
              onClick={() => handleImageClick(image.img)}
            />
          ))}
        </div>
      </div>
      <div className="product-details">
        <div className="pname">{data.P_Name}</div>
        <div className="price">Price: ${data.P_Price}</div>
        {/* <div className="size-dropdown-container">
          <label htmlFor="sizeDropdown">Select Size:</label>
          <select
            id="sizeDropdown"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Select Size</option>
            {data.Size.map((size) => (
              <option key={size.P_Size_ID} value={size.size.Size_Name}>
                {size.size.Size_Name}
              </option>
            ))}
          </select>
        </div> */}
        {data.Size && data.Size.length > 0 && (
          <div className="size-dropdown-container">
            <label htmlFor="sizeDropdown">Select Size:</label>
            <select
              id="sizeDropdown"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Select Size</option>
              {data.Size.map((size) => (
                <option key={size.P_Size_ID} value={size.size.Size_Name}>
                  {size.size.Size_Name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="addtocart">
          <button>
            ADD TO CART
          </button>
        </div>
        <div className="desc">{data.P_Desc}</div>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default ECProductDetail;

// // ECProductDetail.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './css/ECProductDetail.css';

// const ECProductDetail = () => {
//   const { productId } = useParams();
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/EC/products/${productId}/`);
//         setData(response.data);

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, [productId]);

//   const images = data.Images ? data.Images : [];

//   const [selectedImage, setSelectedImage] = useState(images.length > 0 ? images[1].img : '');

//   const handleImageClick = (img) => {
//     setSelectedImage(img);
//   };

//   return (
//     <div className="product-container">
//       <div className="main-image-container">
//         <img src={`http://127.0.0.1:8000${selectedImage}`} alt="Main" className="main-image" />
//       </div>
//       <div className="thumbnail-container">
//         {images.map((image) => (
//           <img
//             key={image.Img_id}
//             src={`http://127.0.0.1:8000${image.img}`}
//             alt={`Thumbnail ${image.Img_id}`}
//             className={`thumbnail ${selectedImage === image.img ? 'active' : ''}`}
//             onClick={() => handleImageClick(image.img)}
//           />
//         ))}
//       </div>
//       <div className="product-details">
//         <h2>{data.P_Name}</h2>
//         <p>{data.P_Desc}</p>
//         <p>Price: ${data.P_Price}</p>
//       </div>
//     </div>
//   );
// };

// export default ECProductDetail;
