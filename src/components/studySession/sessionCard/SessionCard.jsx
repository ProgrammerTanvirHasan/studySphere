import moment from "moment";

const SessionCard = ({ session }) => {
  const { title, textarea, registrationEnd } = session;
  const isRegistrationClosed = moment().isAfter(moment(registrationEnd));

  return (
    <div>
      <div className="card bg-base-800 w-full lg:w-96  shadow-2xl border border-orange-400 h-72">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{textarea}</p>
          <p className="text-xl text-orange-400">
            Registration: {isRegistrationClosed ? "Closed" : "Ongoing"}
          </p>
          <div className="card-actions justify-end">
            <button className="btn bg-orange-400 opacity-80 text-black font-bold">
              Read more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
