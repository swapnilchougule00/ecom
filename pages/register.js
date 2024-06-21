"use client";
import React, { useEffect, useState } from "react";
import Header from "../src/layout/Header";
import Footer from "../src/layout/Footer";
import Layout from "../src/layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import config from '../config/default.json'

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const myData = localStorage.getItem("cart");
      const ParsedData = myData && JSON.parse(myData);
      setCartItems(ParsedData);
    }
  }, []);
  // const cartItems = JSON.parse(localStorage.getItem("cart"));
  // console.log(cartItems);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.firstName.trim()) {
      errors.firstName = "Firstname is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Lastname is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }
    if (!emailRegex.test(formData.email)) {
      errors.email = "Email is invalid";
    } else {
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.phone = "Invalid phone number";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    }
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    console.log(Object.keys(validationErrors).length);

    if (Object.keys(validationErrors).length === 0) {
      setErrors({})
      try {
        // Make a POST request using axios
        const response = await axios.post(
          `${config.API_URL}/register`,
          {
            ...formData,
            cartItems,
          }
        );

        if (response.data.status === 200) {
          localStorage.setItem("email", btoa(formData.email));
          router.push("/verify");
        }
      } catch (error) {
        // Handle errors from the request
        console.error("Error submitting form:", error.message);
      }
    } else {
      console.log(validationErrors);
      setErrors(validationErrors);
    }
  };

  console.log(errors);

  return (
    <Layout header={1}>
      <section className="register-section mt-95">
        <div className="register-container row">
          <div>
            <h3>Register</h3>
            <form className="row" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="username">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  onKeyDown={(event) => {
                    const allowedCharacters = /^[a-zA-Z]+$/;
                    if (!event.key.match(allowedCharacters)) {
                      event.preventDefault();
                    }
                  }}
                />
                {errors.firstName && (
                  <span className="error">{errors.firstName}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="username">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  onKeyDown={(event) => {
                    const allowedCharacters = /^[a-zA-Z]+$/;
                    if (!event.key.match(allowedCharacters)) {
                      event.preventDefault();
                    }
                  }}
                />
                {errors.lastName && (
                  <span className="error">{errors.lastName}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="col-md-6">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>
              <div className="col-md-6">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-password"
                />
                {errors.confirmPassword && (
                  <span className="error">{errors.confirmPassword}</span>
                )}
              </div>
              <div className="col-md-12">
                <button type="submit">Register</button>
              </div>
            </form>
          </div>
          <div className="news-shapes">
            <img
              className="half-leaf"
              src="assets/images/slider/half-leaf.png"
              alt="Leaf"
            />
            <img
              className="leaf-two"
              src="assets/images/shapes/leaf-three.png"
              alt="Leaf"
            />
            <img
              className="leaf-three"
              src="assets/images/shapes/leaf-four.png"
              alt="Leaf"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Register;
