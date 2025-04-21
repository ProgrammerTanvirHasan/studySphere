import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../AuthProvider";
import Swal from "sweetalert2";

const CheckOutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const {
    studySessionID,
    amount,
    tutorEmail,
    studentEmail,
    registrationEnd,
    Tutor,
    classStart,
    duration,
    title,
    textarea,
    status,
    registrationStart,
    classEnd,
  } = location.state || {};
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://stydy-sphere-server-vrnk.vercel.app/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.client_secret);
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to initialize payment. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      setError("Payment details are incomplete.");
      return;
    }

    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethodError) {
      console.error("[PaymentMethod Error]", paymentMethodError);
      setError(paymentMethodError.message);
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.error("Payment Confirmation Error:", confirmError);
      Swal.fire({
        title: "Payment Failed",
        text: confirmError.message,
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const bookingData = {
        studentEmail,
        studySessionID,
        tutorEmail,
        transactionId: paymentIntent.id,
        registrationEnd,
        Tutor,
        classStart,
        duration,
        title,
        textarea,
        status,
        registrationStart,
        classEnd,
        amount,
      };

      fetch("https://stydy-sphere-server-vrnk.vercel.app/bookedSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((response) => response.json())

        .then(() => {
          Swal.fire({
            title: "Booking Successful!",
            text: "Your session has been successfully booked after payment.",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((error) => {
          console.error("Error saving booking:", error);
          Swal.fire({
            title: "Booking Error",
            text: "Payment succeeded, but booking failed. Please contact support.",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
    navigate("/");
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn px-4 bg-green-600 text-white"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      {error && <p className="text-red-700">{error}</p>}
      {transactionId && (
        <p className="text-green-700 mt-2">
          Payment successful! Transaction ID: {transactionId}
        </p>
      )}
    </form>
  );
};

export default CheckOutForm;
