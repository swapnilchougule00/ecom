import Link from "next/link";
import React, { useEffect, useState } from "react";
import ClientLogoSlider from "../src/components/ClientLogoSlider";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import { useCartStore } from "../src/useCartStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../config/default.json";

const CartPage = () => {
  const [cartData, setCartData] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");

  // total price
  // const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {}, [coupon]);

  const {
    subTotal,
    totalPrice,
    gst: vat,
  } = useCartStore((state) => ({
    subTotal: state.subTotal,
    totalPrice: state.totalPrice,
    gst: state.gst,
  }));

  let shipping = 10;

  useEffect(() => {
    const cart_data = localStorage?.getItem("cart") || [];
    const cartData = cart_data.length > 0 && JSON.parse(cart_data);

    cartData && useCartStore.getState().calculateAmounts(cartData);

    const parsedData = cart_data.length > 0 && JSON.parse(cart_data);
    setCartData(parsedData);
  }, []);

  const handleCouponApply = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (coupon.trim() === "") {
      setCouponError("Coupon field should be filled");
      return;
    }
    if (token) {
      try {
        const response = await axios.post(
          `${config.API_URL}/apply_coupon`,
          {
            coupon,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              email: atob(email),
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.status === 200) {
          toast.error(" coupon applied");
        } else {
          console.error(
            "Error: Unexpected response status:",
            response.data.status
          );
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      toast.error("Please login to apply coupon");
    }
  };

  const updateQuantity = (item, type) => {
    let findCartItem = cartData.find((cart, i) => i === item);
    const oldQuantity = findCartItem.qty; // Store the old quantity
    console.log(findCartItem);
    findCartItem.qty =
      type === "-"
        ? findCartItem.qty === 1
          ? 1
          : +findCartItem.qty - 1
        : type !== "-" && +findCartItem.qty < 10
        ? +findCartItem.qty + 1
        : +findCartItem.qty;

    if (findCartItem.qty !== oldQuantity) {
      findCartItem;
      showToast("success", `Quantity updated for ${findCartItem.product_name}`);
    }
    useCartStore.getState().calculateAmounts(cartData);
    setCartData([...cartData]);
  };

  const showToast = (type, message) => {
    toast.success(message);
  };

  const handleRemoveProduct = async (cart) => {
    const token = localStorage?.getItem("token");
    const email = localStorage?.getItem("email");

    if (token) {
      try {
        const response = await axios.post(
          `${config.API_URL}/remove_cart_product`,
          {
            id: cart.id,
            p_id: cart.p_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              email: atob(email),
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.status === 200) {
          setCartData(response.data.cart);
          localStorage.setItem("cart", JSON.stringify(response.data.cart));
          useCartStore.getState().updateCartCount();
          toast.error(cart.product_name + " item removed!");
        } else {
          console.error(
            "Error: Unexpected response status:",
            response.data.status
          );
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      useCartStore.getState().removeCartItems(cart.id);
      toast.error(cart.product_name + " item removed!");
    }
  };

  const handleUpdateQuantity = async (cart, i, cond) => {
    const token = localStorage?.getItem("token");
    const email = localStorage?.getItem("email");

    if (token && cart.qty !== 1) {
      try {
        const response = await axios.post(
          `${config.API_URL}/update_cart_quantity`,
          {
            id: cart.id,
            qty: cond === "plus" ? cart.qty + 1 : cart.qty - 1,
            p_id: cart.p_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              email: atob(email),
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.status === 200) {
          if (cond === "minus") {
            updateQuantity(i, "-");
          } else {
            updateQuantity(i, "+");
          }
          useCartStore.getState().updateQuantity(cart.id, cart.qty);
        } else {
          console.error(
            "Error: Unexpected response status:",
            response.data.status
          );
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      if (cond === "minus") {
        updateQuantity(i, "-");
      } else {
        updateQuantity(i, "+");
      }
      useCartStore.getState().updateQuantity(cart.id, cart.qty);
    }
  };

  return (
    <Layout>
      <PageBanner pageName={"Cart"} />
      {cartData.length > 0 ? (
        <div className="cart-area py-130 rpy-100">
          <div className="container">
            <div className="cart-item-wrap mb-35 wow fadeInUp delay-0-2s">
              {cartData &&
                cartData.map((cart, i) => (
                  <div className="cart-single-item" key={i}>
                    <div className="cart-img">
                      <img
                        src={`assets/images/slider/${cart.image}`}
                        alt="Product Image"
                      />
                    </div>
                    <h5 className="product-name">{cart.product_name}</h5>
                    <span className="product-">₹{cart.price}</span>
                    <div className="quantity-input">
                      <input
                        className="quantity"
                        type="text"
                        defaultValue={cart.qty}
                        value={cart.qty}
                        name="quantity"
                      />
                      <div className="cart-input">
                        <button
                          className="quantity-up"
                          onClick={() => {
                            handleUpdateQuantity(cart, i, "plus");
                          }}
                        >
                          +
                        </button>
                        <button
                          className="quantity-down"
                          onClick={() => {
                            handleUpdateQuantity(cart, i, "minus");
                          }}
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <strong className="product-total">
                      ₹ {(cart.qty || cart.quantity) * cart.price}
                    </strong>
                    <button
                      type="button"
                      className="close"
                      onClick={() => {
                        handleRemoveProduct(cart);
                      }}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                ))}
            </div>
            <div className="row text-center text-lg-left align-items-center wow fadeInUp delay-0-2s">
              <div className="col-lg-6">
                <div className="discount-wrapper rmb-30">
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    action="#"
                    className="d-sm-flex justify-content-center justify-content-lg-start"
                  >
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => {setCoupon(e.target.value);
                        setCouponError('')
                      }}
                      placeholder="Coupon Code"
                      required=""
                    />
                    <button
                      onClick={handleCouponApply}
                      className="theme-btn flex-none"
                      type="submit"
                    >
                      apply Coupon <i className="fas fa-angle-double-right" />
                    </button>
                  </form>
                  <p
                    className="error"
                    style={{ color: "red", fontWeight: "bold" }}
                  >
                    {couponError}
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="update-shopping text-lg-right">
                  <Link href="/shop">
                    <a className="theme-btn style-two">
                      shopping <i className="fas fa-angle-double-right" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="payment-cart-total pt-25 wow fadeInUp delay-0-2s">
              <div className="row justify-content-end">
                <div className="col-lg-5">
                  <div className="shoping-cart-total mt-45">
                    <h4 className="form-title m-25">Cart Totals</h4>
                    <table>
                      <tbody>
                        <tr>
                          <td>Cart Subtotal</td>
                          <td className="sub-total">₹{subTotal}</td>
                        </tr>
                        <tr>
                          <td>Shipping Fee</td>
                          <td className="shipping-">₹{shipping.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td>GST</td>
                          <td>₹{vat}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Order Total</strong>
                          </td>
                          <td>
                            <strong className="total-">₹ {totalPrice}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <Link href="/checkout">
                      <a className="theme-btn style-two mt-25 w-100">
                        Proceed to checkout
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-area py-130 rpy-100">
          <div className="container">
            <div
              className="cart-item-wrap mb-35 wow fadeInUp delay-0-2s"
              style={{ justifyContent: "center", display: "flex" }}
            >
              <h4>Your Cart is Empty !</h4>
            </div>
          </div>
        </div>
      )}
      {/* Cart Area End */}
      {/* Client Logo Section Start */}
      <div className="client-logo-section text-center bg-light-green py-60">
        <div className="container">
          <ClientLogoSlider />
        </div>
        <div className="client-logo-shapes">
          <img
            className="shape-one"
            src="assets/images/shapes/cl-shape1.png"
            alt="Shape"
          />
          <img
            className="shape-two"
            src="assets/images/shapes/cl-shape2.png"
            alt="Shape"
          />
          <img
            className="shape-three"
            src="assets/images/shapes/cl-shape3.png"
            alt="Shape"
          />
          <img
            className="shape-four"
            src="assets/images/shapes/cl-shape4.png"
            alt="Shape"
          />
          <img
            className="shape-five"
            src="assets/images/shapes/cl-shape5.png"
            alt="Shape"
          />
          <img
            className="shape-six"
            src="assets/images/shapes/cl-shape6.png"
            alt="Shape"
          />
        </div>
      </div>
    </Layout>
  );
};
export default CartPage;
