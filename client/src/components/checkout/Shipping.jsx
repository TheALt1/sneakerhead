import React from 'react';
import { Context } from "../../utils/context";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../../utils/api";
import "../checkout/Shipping.scss";
import { ToastContainer, toast } from 'react-toastify';
import { useContext, useState } from "react";
import { userData } from '../../utils/helpers';
const Shipping = () => {
  //form validation
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address: '',
    zip: '',
    country: 'India',
    state: '',
    agreement: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.zip ||
      !formData.agreement
    ) {
      toast.error('Please accept the condition.');
    } else if (!/^\d{6}$/.test(formData.zip)) {
      toast.error('Zip should be 6 digits and contain only numbers');
    }  else {
      // Form validation passed, you can submit the form or take any other action here.
      console.log('Form data:', formData);
      handlePayment();
    }
  };
//json object creation
const shippingDetails = {
  firstName: formData.firstName,
  lastName: formData.lastName,
  address: formData.address,
  address2: formData.address2,
  city: formData.city,
  country: formData.country,
  state: formData.state,
  zip: formData.zip,
  agreement: formData.agreement,
};
const {email} = userData();
console.log(email);

//checkout code
  const { cartItems, cartSubTotal } = useContext(Context);
  console.log(cartItems);
  const stripePromise = loadStripe('pk_test_51NtpnsSI7HZWJAd659tIN2jeuCLIJrIyasfS9PJWd98phoHD7x9pW1ddaZvUHZf5gZt6gDdYPIQ0fvodOB98tot100YsDUSEQB');
    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;
             const res = await makePaymentRequest.post("/api/orders", {
                 products: cartItems,
                 shippingDetails: shippingDetails,
                 email: email,
             });
            console.log('Server Response:', res);
            await stripe.redirectToCheckout({
                sessionId: res.data?.stripeSession.id,
            });
          
        } catch (err) {
            console.log(err);
        }
    };
return (
  <div className="maincontainer">
      <div className="container">
        <div className="py-5 text-center">
          <h2>Shipping Details</h2>
        </div>
        <div className="row">
          <div className="addcont">
            <h4 className="SA">Shipping address</h4>
            <form className="needs-validation" onSubmit={handleSubmit}>
              <div className="row2">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address Line</label><br />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="1234 Main St"
                  rows="3"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address2">Landmark <span className="text-muted">(Optional)</span></label><br />
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Apartment or suite"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city">City</label><br />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="New Delhi"
                  required
                />
              </div>
              <div className="row1">
                <div className="col-md-5 mb-3">
                  <label htmlFor="country">Country</label><br />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="custom-select form-control"
                    required
                    disabled
                  >
                    <option value="India">India</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="state">State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="custom-s form-control"
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label><br />
                  <input
                    type="number"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="form-control"
                    maxLength="6"
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div className="custom-checkbox">
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleChange}
                  className="custom-control-input"
                  id="same-address"
                />
                <label className="custom-control-label" htmlFor="same-address">
                  I agree that the Shipping address stated above is the best to my knowledge.
                </label>
              </div><br />
              <button className="checkoutbtn" type="submit" >
                Continue to checkout
              </button>
            </form>
          </div>
          <div className="mt-column">
            <h4 className="crt">
              <span>Your cart</span>
            </h4>
            <ul className="list-group">
              {cartItems.map(item => (
                <li className="my-list-item" key={item.id} >
                  <div>
                    <h6 className="my-0">{item.attributes.name}</h6>
                    <small className="text-muted">{item.attributes.subtitle}</small>
                  </div>
                  <span className="text-muted">&#8377;{item.attributes.price}</span>
                </li>
              ))}
              <li className="list-group-item">
                <span>Total (INR)</span>
                <strong>&#8377;{cartSubTotal}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
   
)};
export default Shipping;