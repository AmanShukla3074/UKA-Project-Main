import React from "react";
import "./Cart.css";
import { MenuContext } from "../../../Context/MenuContext";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { MdDelete } from "react-icons/md";
// import useRazorpay from 'react-razorpay';

const Cart = () => {
  const { addToCart, removeFromCart, cartItems } = useContext(MenuContext);

  const [data, setData] = useState({
    cart: {},
    cart_items: [], // Initialize as an empty array
    menus: [], // Initialize as an empty array
    message: "",
  });

  const [cartCounts1, setCartCounts1] = useState({});
  // const [count,setCount] = useState();
  useEffect(() => {}, [cartCounts1]);

  const handleIncrement = async (event, cart_items) => {
    event.preventDefault();
    const updatedCounts = {
      ...cartCounts1,
      [cart_items.CartDetailsID]:
        (cartCounts1[cart_items.CartDetailsID] || cart_items.ItemQuantity) + 1,
    };
    setCartCounts1(updatedCounts);

    try {
      const accessToken = localStorage.getItem("authTokens");
      const { access } = JSON.parse(accessToken);
      const updatedQuantity = (cart_items.ItemQuantity || 0) + 1;

      await axios.put(
        `http://127.0.0.1:8000/api/EC/cart/`,
        {
          Cart_Item_ID: cart_items.CartDetailsID,
          ItemQuantity: updatedQuantity,
          Cart_ID: data.cart.CartID,
          P_ID: cart_items.P_ID,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Fetch updated cart data after increment operation
      const response = await axios.get("http://127.0.0.1:8000/api/EC/cart/", {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("authTokens");
        const { access } = JSON.parse(accessToken);
        console.log("Access Token:", access);

        const response = await axios.get("http://127.0.0.1:8000/api/EC/cart/", {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        });

        setData(response.data);
        console.log("adrfs", data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleDecrement = async (cart_items, itemId) => {
    setCartCounts1((prevCounts) => {
      const updatedCounts = {
        ...prevCounts,
        [cart_items.CartDetailsID]: Math.max(
          0,
          (prevCounts[cart_items.CartDetailsID] || 0) - 1
        ),
      };
      return updatedCounts;
    });

    try {
      const accessToken = localStorage.getItem("authTokens");
      const { access } = JSON.parse(accessToken);
      const updatedQuantity = Math.max(0, (cart_items.ItemQuantity || 0) - 1);

      await axios.patch(
        `http://127.0.0.1:8000/api/EC/cart/`,
        {
          Cart_Item_ID: cart_items.CartDetailsID,
          ItemQuantity: updatedQuantity,
          Cart_ID: data.cart.CartID,
          P_ID: cart_items.P_ID,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Fetch updated cart data after decrement operation
      const response = await axios.get("http://127.0.0.1:8000/api/EC/cart/", {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  // const handleDecrement = async (cart_items, itemId) => {
  //   setCartCounts1((prevCounts) => {
  //     const updatedCounts = {
  //       ...prevCounts,
  //       [cart_items.CartDetailsID]: Math.max(
  //         0,
  //         (prevCounts[cart_items.CartDetailsID] || 0) - 1
  //       ),
  //     };
  //     return updatedCounts;
  //   });

  //   try {
  //     const accessToken = localStorage.getItem("authTokens");
  //     const { access } = JSON.parse(accessToken);
  //     const updatedQuantity = (cart_items.ItemQuantity || 0) - 1;

  //     // Ensure the request body reflects the updated quantity

  //     console.log("access:", access);
  //     // console.log("updatedQuantity", updatedQuantity)
  //     await axios.patch(
  //       `http://127.0.0.1:8000/api/EC/cart/`,
  //       {
  //         Cart_Item_ID: cart_items.CartDetailsID,
  //         ItemQuantity: updatedQuantity,
  //         Cart_ID: data.cart.CartID,
  //         P_ID: cart_items.P_ID,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${access}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     removeFromCart(cart_items.Item_ID);
  //   } catch (error) {
  //     console.error("Error updating item quantity:", error);
  //   }

  //   console.log("data.cart.CartID", data.cart.CartID);
  //   console.log("cart_items", cart_items);
  // };

  const handleDelete = async (itemId) => {
    const accessToken = localStorage.getItem("authTokens");
    const { access } = JSON.parse(accessToken);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/EC/cart1/${itemId}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Item deleted successfully");
      // Fetch updated cart data after delete operation
      const response = await axios.get("http://127.0.0.1:8000/api/EC/cart/", {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      });
      setData(response.data); // Update the data state with the fetched data
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <>
      <div className="cart">
        {data.cart_items.map((cartItem) => {
          const product = data.menus.find(
            (menu) => menu.P_ID === cartItem.P_ID
          );

          // Check if the product and its images exist
          const productImages = product && product.Images ? product.Images : [];

          return (
            <div key={cartItem.CartDetailsID} className="cartItem">
              {/* Use the first image as an example, adjust as needed */}
              <div className="cartImg">
                <img
                  src={`http://127.0.0.1:8000${productImages[0]?.img}`}
                  alt={product?.P_Name}
                />
              </div>
              <div className="cartDescription">
                <p className="cartItemHeader">{product?.P_Name}</p>
                <div className="cartBtns">

                
                <button onClick={(event) => handleIncrement(event, cartItem)} className="plusMinusBtn">
                  +
                </button>
                <p className="qtyNumber">
                  {/* Quantity:{" "} */}
                  {cartCounts1[cartItem.CartDetailsID] || cartItem.ItemQuantity}
                </p>
                <button
                  onClick={() =>
                    handleDecrement(cartItem, cartItem.CartDetailsID)
                  }
                 className="plusMinusBtn">
                  -
                </button>
              <button onClick={() => handleDelete(cartItem.CartDetailsID)} className="deleteBtn">
                <MdDelete/>
                
              </button>
              </div>
                <p className="cartItemSubtot">Subtotal: {cartItem.Subtotal}</p>
              </div>
            </div>
          );
        })}{" "}
      </div>
      <div className="checkout">
      <h2>Total Amount: {'\u20B9'} {data.cart.Total}</h2>
      <div className="checkoutButtonWrap">

        <button className="checkoutButton">Checkout</button>
      </div>
      </div>
    </>
  );
};
export default Cart;
