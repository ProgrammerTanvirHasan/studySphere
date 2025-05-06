const Info = () => {
  return (
    <div className="bg-white shadow-xl rounded-xl w-[95%] mx-auto my-16 py-8 px-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div>
          <h1 className="text-3xl font-bold text-red-400">২৫ লক্ষ+</h1>
          <p className="text-gray-600 mt-2 text-sm">শিক্ষার্থী</p>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-blue-400">২০ জন+</h1>
          <p className="text-gray-600 mt-2 text-sm">অভিজ্ঞ মেন্টর</p>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-green-400">২০ লক্ষ+</h1>
          <p className="text-gray-600 mt-2 text-sm">অ্যাপ ডাউনলোড</p>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-orange-500">১.৮ লক্ষ+</h1>
          <p className="text-gray-600 mt-2 text-sm">লার্নিং ম্যাটেরিয়াল</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
