"use client";
import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import PageBanner from "../src/components/PageBanner";
import Layout from "../src/layout/Layout";
import Link from "next/link";
import { useCartStore } from "../src/useCartStore";
const Checkout = () => {
  const [cartData, setCartData] = useState([]);

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

  // useEffect(() => {
  //   let localStorageData = JSON.parse(localStorage.getItem("munfirm"));
  //   setTotalPrice(localStorageData.totalPrice);
  //   setShipping(localStorageData.shipping);
  //   setVat(localStorageData.vat);
  //   setCartData(localStorageData.cartData);
  // }, []);

  return (
    <Layout>
      <PageBanner pageName={"Checkout"} />
      <div className="checkout-form-area py-130 rpy-100">
        <div className="container">
          <Accordion
            className="checkout-faqs wow fadeInUp delay-0-2s"
            id="checkout-faqs"
          ></Accordion>
          <h4 className="form-title mt-50 mb-25">Billing Details</h4>
          <form
            onSubmit={(e) => e.preventDefault()}
            id="checkout-form"
            className="checkout-form wow fadeInUp delay-0-2s"
            name="checkout-form"
            action="#"
            method="post"
          >
            <div className="row">
              <div className="alert checkout-login ">
                <form
                  className="checkout-login-form"
                  onSubmit={(e) => e.preventDefault()}
                  action="#"
                >
                  <p>Please login your accont.</p>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                      <div className="form-group">
                        <input
                          type="email"
                          id="email-address"
                          name="email-address"
                          className="form-control"
                          defaultValue=""
                          placeholder="Your Email Address"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label>Password</label>
                      <div className="form-group">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          defaultValue=""
                          placeholder="Your Password"
                          required=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-footer form-footer-checkout">
                    <button type="submit" className="theme-btn style-two">
                      login <i className="fas fa-angle-double-right" />
                    </button>

                    <span>
                      Don`t have a account?{" "}
                      <Link
                        style={{ color: "orange", marginTop: "6px" }}
                        href="/register"
                      >
                        Click here to Register
                      </Link>{" "}
                    </span>
                  </div>
                </form>
              </div>

              <div className="col-lg-12">
                <h6>Your Address</h6>
              </div>
              <div className="col-md-6 mb-30">
                <div className="form-group">
                  <select name="country" id="country">
                    <option value="value1">Select Country</option>
                    <option value="value2">Australia</option>
                    <option value="value3">Canada</option>
                    <option value="value4">China</option>
                    <option value="value5">Morocco</option>
                    <option value="value6">Saudi Arabia</option>
                    <option value="value7">United Kingdom (UK)</option>
                    <option value="value8">United States (US)</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-control"
                    defaultValue=""
                    placeholder="City"
                    required=""
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="form-control"
                    defaultValue=""
                    placeholder="State"
                    required=""
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    className="form-control"
                    defaultValue=""
                    placeholder="Zip"
                    required=""
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="street-name"
                    name="street-name"
                    className="form-control"
                    defaultValue=""
                    placeholder="House, street name"
                    required=""
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    id="apartment-name"
                    name="apartment-name"
                    className="form-control"
                    defaultValue=""
                    placeholder="Apartment, suite, unit etc. (optional)"
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <h6>Order Notes (optional)</h6>
              </div>
              <div className="col-md-12">
                <div className="form-group mb-0">
                  <textarea
                    name="order-note"
                    id="order-note"
                    className="form-control"
                    rows={5}
                    placeholder="Notes about your order, e.g. special notes for delivery."
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="payment-cart-total pt-25">
            <div className="row justify-content-between">
              <div className="col-lg-6">
                <div className="payment-method mt-45 wow fadeInUp delay-0-2s">
                  <h4 className="form-title my-25">Payment Method</h4>
                  <Accordion
                    defaultActiveKey="collapseOne"
                    as="ul"
                    id="paymentMethod"
                    className="mb-30"
                  >
                    {/* Default unchecked */}
                    <li className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id="methodone"
                        name="defaultExampleRadios"
                        defaultChecked
                      />
                      <Accordion.Toggle
                        as="label"
                        className="custom-control-label"
                        htmlFor="methodone"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        eventKey="collapseOne"
                      >
                        Direct Bank Transfer{" "}
                        <i className="fas fa-money-check" />
                      </Accordion.Toggle>
                      <Accordion.Collapse
                        eventKey="collapseOne"
                        data-parent="#paymentMethod"
                        style={{}}
                      >
                        <p>
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                          Your order will not be shipped our account.
                        </p>
                      </Accordion.Collapse>
                    </li>
                    {/* Default unchecked */}
                    <li className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id="methodtwo"
                        name="defaultExampleRadios"
                      />
                      <Accordion.Toggle
                        as="label"
                        className="custom-control-label collapsed"
                        htmlFor="methodtwo"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        eventKey="collapseTwo"
                      >
                        Cash On Delivery <i className="fas fa-truck" />
                      </Accordion.Toggle>
                      <Accordion.Collapse
                        eventKey="collapseTwo"
                        data-parent="#paymentMethod"
                        style={{}}
                      >
                        <p>Pay with cash upon delivery.</p>
                      </Accordion.Collapse>
                    </li>
                    {/* Default unchecked */}
                    <li className="custom-control custom-radio">
                      <input
                        type="radio"
                        className="custom-control-input"
                        id="methodthree"
                        name="defaultExampleRadios"
                      />
                      <Accordion.Toggle
                        as="label"
                        className="custom-control-label collapsed"
                        htmlFor="methodthree"
                        data-toggle="collapse"
                        data-target="#collapsethree"
                        eventKey="collapsethree"
                      >
                        Paypal <i className="fab fa-cc-paypal" />
                      </Accordion.Toggle>
                      <Accordion.Collapse
                        eventKey="collapsethree"
                        data-parent="#paymentMethod"
                        style={{}}
                      >
                        <p>
                          Pay via PayPal; you can pay with your credit card if
                          you don’t have a PayPal account.
                        </p>
                      </Accordion.Collapse>
                    </li>
                  </Accordion>
                  <p>
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our privacy policy.
                  </p>
                  <button type="button" className="theme-btn mt-15">
                    Place order
                  </button>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="shoping-cart-total mt-45 wow fadeInUp delay-0-4s">
                  <h4 className="form-title m-25">Cart Totals</h4>
                  <table>
                    <tbody>
                      {cartData.map((card) => (
                        <tr key={card.id}>
                          <td>
                            {card.title} <strong>× {card.quantity}</strong>
                          </td>
                          <td>₹{(card.quantity * card.price).toFixed(2)}</td>
                        </tr>
                      ))}

                      <tr>
                        <td>Shipping Fee</td>
                        <td>₹{shipping.toFixed(2)}</td>
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
                          <strong>₹{totalPrice}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Checkout;
