const TutorName = ({ tutor }) => {
  const { email, name } = tutor;
  return (
    <div className="shadow-2xl py-8 pl-4 border border-orange-400">
      <h2 className="text-xl font-semibold">{name}</h2>
      <h2> {email}</h2>
    </div>
  );
};

export default TutorName;
