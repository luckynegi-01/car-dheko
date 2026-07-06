import React, { useState } from "react";
import "./Payment.css";
import { X, Lock, CreditCard } from 'lucide-react';

function Payment({ showPayment, setShowPayment, activeModalCar }) {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!showPayment) return null;

  return (
    <div className="modal-overlay active" onClick={() => setShowPayment(false)}>
      <div className="payment-card" onClick={(e) => e.stopPropagation()}>
        <button className="payment-close" onClick={() => setShowPayment(false)}>
          <X size={24} />
        </button>

        <div className="payment-header">
          <div className="payment-icon">
            <CreditCard size={32} />
          </div>
          <h2>Secure Payment</h2>
          <p className="security-badge"><Lock size={14} /> Secured by Bank-Level Encryption</p>
        </div>

        <div className="vehicle-summary">
          <img src={activeModalCar?.img} alt={activeModalCar?.name} className="vehicle-img" />
          <div className="vehicle-info">
            <h3>{activeModalCar?.name}</h3>
            <p className="vehicle-type">{activeModalCar?.type} • {activeModalCar?.transmission}</p>
            <p className="vehicle-price">{activeModalCar?.rawPrice}</p>
          </div>
        </div>

        <form className="payment-form">
          <div className="form-group">
            <label>Cardholder Name</label>
            <input
              type="text"
              name="cardHolder"
              placeholder="John Doe"
              value={cardDetails.cardHolder}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Card Number</label>
            <div className="card-input-wrapper">
              <CreditCard size={18} className="card-icon" />
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                maxLength="5"
                value={cardDetails.expiryDate}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="password"
                name="cvv"
                placeholder="•••"
                maxLength="3"
                value={cardDetails.cvv}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="price-summary">
            <div className="summary-row">
              <span>Vehicle Price</span>
              <span className="price">{activeModalCar?.rawPrice}</span>
            </div>
            <div className="summary-row">
              <span>Processing Fee</span>
              <span className="price">$99</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total Amount</span>
              <span className="price-total">${(activeModalCar?.price + 99).toLocaleString()}</span>
            </div>
          </div>

          <button
            type="button"
            className="pay-btn"
            onClick={() => {
              if (cardDetails.cardNumber && cardDetails.cardHolder && cardDetails.expiryDate && cardDetails.cvv) {
                alert("Payment Successful 🎉\n\nYour order has been confirmed!");
                setShowPayment(false);
                setCardDetails({ cardNumber: "", cardHolder: "", expiryDate: "", cvv: "" });
              } else {
                alert("Please fill in all payment details");
              }
            }}
          >
            <Lock size={16} />
            Complete Purchase - {activeModalCar?.rawPrice}
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => setShowPayment(false)}
          >
            Cancel Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;