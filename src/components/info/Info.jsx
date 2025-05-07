const Info = () => {
  return (
    <div className="bg-white shadow-xl rounded-xl w-[95%] mx-auto my-16 py-8 px-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div>
          <h1 className="text-3xl font-bold text-red-400">2.5M+</h1>
          <p className="text-gray-600 mt-2 text-sm">Students</p>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-blue-400">20+</h1>
          <p className="text-gray-600 mt-2 text-sm">Experienced Mentors</p>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-green-400">2M+</h1>
          <p className="text-gray-600 mt-2 text-sm">App Downloads</p>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-orange-500">180K+</h1>
          <p className="text-gray-600 mt-2 text-sm">Learning Materials</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
