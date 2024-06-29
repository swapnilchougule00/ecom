import Link from "next/link";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/components/PageBanner";
import { useState } from "react";

function MyOrders() {
  const data = [{ image: "asdasd", product_name: "oil", price: 999, qty: 10 }];
  const [orderData, setOrderData] = useState(data);
  return (
    <Layout>
      <PageBanner pageName={"Orders"} />
      {orderData.length > 0 ? (
        <div className="cart-area py-30 rpy-10">
          <div className="container">
            <h4>Your Orders</h4>
            <div className="cart-item-wrap mb-35 wow fadeInUp delay-0-2s">
              {orderData &&
                orderData.map((order, i) => (
                  <div className="cart-single-item" key={i}>
                    <div className="cart-img">
                      <img
                        src={`assets/images/slider/${order.image}`}
                        alt="Product Image"
                      />
                    </div>
                    <h5 className="product-name">{order.product_name}</h5>
                    <span className="product-">₹{order.price}</span>
                    <div className="quantity-input">
                      <input
                        className="quantity"
                        type="text"
                        readOnly
                        defaultValue={order.qty}
                        value={order.qty}
                        name="quantity"
                      />
                    </div>
                    <strong className="product-total">
                      ₹ {(order.qty || order.quantity) * order.price}
                    </strong>
                  </div>
                ))}
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
              <h4>No Orders !</h4>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default MyOrders;
