import { Link } from "react-router";

const BookedEmail = ({ booked }) => {
  const { textarea, transactionId, title } = booked;
  return (
    <div>
      <div className="card bg-base-800 w-full   shadow-2xl border border-orange-400 h-72">
        <div className="card-body">
          <h2 className="card-title"> {title}</h2>
          <p>{textarea}</p>

          {transactionId ? (
            <>
              <p>TransactionId:{transactionId}</p>
            </>
          ) : (
            <>
              {" "}
              <p>
                RegistrationFee: <span className="font-bold">Free</span>{" "}
              </p>{" "}
            </>
          )}

          <div className="card-actions justify-end">
            <Link to={`/bookedDetails/${title}`}>
              <button className="btn bg-orange-400 opacity-80 text-white ">
                View detail
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedEmail;
