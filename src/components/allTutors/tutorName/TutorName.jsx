const TutorName = ({ tutor }) => {
  const { email, name } = tutor;
  return (
    <div className="bg-white shadow-md border border-orange-300 rounded-xl p-6 hover:shadow-lg hover:border-orange-500 transition duration-300">
      <h2 className="text-lg font-bold text-orange-600 mb-2">👨‍🏫 {name}</h2>
      <p className="text-sm text-gray-600">
        📧 <span className="font-medium">{email}</span>
      </p>
    </div>
  );
};

export default TutorName;
