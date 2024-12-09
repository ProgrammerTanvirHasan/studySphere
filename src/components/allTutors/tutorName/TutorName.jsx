const TutorName = ({ tutor }) => {
  const { email, name } = tutor;
  return (
    <div className="bg-orange-300 opacity-80 text-slate-950 py-8 pl-4 rounded-xl" >
   <h2 className="font-bold">Tutor:  {name}</h2>
   <h2 >Email:  {email}</h2>
    </div>
  );
};

export default TutorName;
