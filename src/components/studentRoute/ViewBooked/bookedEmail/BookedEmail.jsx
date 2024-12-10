const BookedEmail = ({ booked }) => {
  const { tutorEmail, studentEmail, transactionId, textarea } = booked;
  return (
    <div>
      <div className="card bg-base-800 w-full lg:w-96  shadow-2xl border border-orange-400 h-72">
        <div className="card-body">
          <h2 className="card-title">Tutor: {tutorEmail}</h2>
          <p>TransactionId:{transactionId}</p>
          <p className="text-xl text-orange-400">Registration:{textarea}</p>
          <div className="card-actions justify-end">
            <button className="btn bg-orange-400 opacity-80 text-black font-bold">
              view detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedEmail;
