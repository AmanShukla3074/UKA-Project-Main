// ECProductDetail.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./css/ECProductDetail.css";
import AuthContext from "../../Context/AuthContext";
import StarRating from "../../Components/Ecom/StarRating/StarRating";
import { MenuContext } from "../../Context/MenuContext";

const ECProductDetail = () => {
  const { productId } = useParams();
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [productReview, setProductReview] = useState([]);

  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const {addToCart} = useContext(MenuContext);

  const { authTokens } = useContext(AuthContext);


  const handleAddToCart = async (productId) => {
    try {
      // const accessToken = localStorage.getItem('access_token');
      const accessToken = localStorage.getItem('authTokens');
      const { access } = JSON.parse(accessToken);
      console.log('Access Token:', access)

      // console.log('Access Token:', accessToken);
      // Make a POST request to your server's add-to-cart endpoint
      await axios.post('http://127.0.0.1:8000/api/EC/cart/', {
        P_ID: productId,
        ItemQuantity: 1,
      },{
        headers: {
          Authorization: `Bearer ${access}`,
          'Content-Type': 'application/json', 
        },
    });
    alert("aa")
      addToCart(productId);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };  



  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      Rate: rating,
      Review: review,
      P_ID: productId,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/EC/RateReview/",
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      // Optionally, clear the form fields after successful submission
      setRating("");
      setReview("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/EC/RateReview?p_id=${productId}`,
          {
            headers: {
              Authorization: `Bearer ${authTokens?.access}`,
              "Content-Type": "application/json",
            },
          }
        );
        setProductReview(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [productId]);

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
    <>
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
            <button onClick={() => handleAddToCart(productId)}>ADD TO CART</button>
          </div>
          <div className="desc">{data.P_Desc}</div>
          {/* Add more details as needed */}
        </div>
      </div>

      <div className="ProductReview">
        <div className="review-list">
          {productReview.map((review) => (
            <div key={review.Rate_ID} className="review-item">
              <div className="reviewRateDate">
                <StarRating rating={parseInt(review.Rate, 10)} />
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(review.RateReview_Date).toLocaleDateString()}
                </p>
              </div>
              <p>
                <strong>Review:</strong> {review.Review}
              </p>
              <p>
                <strong>Reviewed by:</strong> {review.User_ID.first_name}{" "}
                {review.User_ID.last_name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="RateForm">
        <form onSubmit={handleSubmit} className="review-form">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />

          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            name="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>

          <button type="submit">Submit Review</button>
        </form>
      </div>
    </>
  );
};

export default ECProductDetail;
