const BookedEmail = ({ booked }) => {
  const { textarea, transactionId, title } = booked;

  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-white w-full  shadow-2xl rounded-xl border ">
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-orange-500">{title}</h2>
          <p className="text-gray-700">{textarea}</p>

          {transactionId ? (
            <p className="text-green-600">
              <span className="font-medium">Transaction ID:</span>{" "}
              {transactionId}
            </p>
          ) : (
            <p className="text-blue-600">
              <span className="font-medium">Registration Fee:</span> Free
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookedEmail;
