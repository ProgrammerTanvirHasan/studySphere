import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";


const stripePromise = loadStripe(
  "pk_test_51QUQaHRvXT53lVY8lknIeZHNYMwlAyaHJ3iSq265gTei3PxSX8IUzrWo8QRGz6nYL7R9XTDWTvp5O80NkOKpWWoj00MpyY4EQe"
);
const Payment = () => {
  
  return (
    <div>
      <h2 className="text-xl bg-orange-400 text-center text-white ">Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckOutForm />
      </Elements>
    </div>
  );
};

export default Payment;
