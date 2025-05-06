import { RiDoubleQuotesR } from "react-icons/ri";

const AboutUs = () => {
  return (
    <div className="relative min-h-[100vh] bg-gray-50 py-8">
      <div className="bg-[#354895]/90 min-h-[500px] w-[95%] rounded-xl mx-auto relative px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between gap-8 max-w-6xl mx-auto">
          <div className="text-white lg:w-1/2 space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold">
              কেন StudySphere-তে আস্থা রাখবে?
            </h1>
            <p className="text-base md:text-lg leading-relaxed">
              সেরা মেন্টর, আধুনিক লার্নিং টুলস এবং সহজবোধ্য উপস্থাপনায়
              StudySphere শিক্ষার্থীদের জন্য একটি আদর্শ লার্নিং প্ল্যাটফর্ম।
              একাডেমিক পড়াশোনা হোক বা প্রতিযোগিতামূলক পরীক্ষা— আমরা প্রস্তুত
              আপনার পাশে থাকতে।
            </p>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            {[
              "সেরা কন্টেন্ট",
              "সহজ স্টাডি ম্যাটেরিয়াল",
              "স্বল্প খরচে অনেক কিছু",
              "সাবলীল উপস্থাপনা",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white text-[#354895] font-medium text-center py-6 px-2 rounded-lg shadow-md"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-1/2 translate-x-[-50%] bottom-[-100px] min-h-[200px] w-[90%] md:w-[75vh] bg-white shadow-xl rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-start gap-2">
              <RiDoubleQuotesR className="text-4xl text-orange-500" />
              <p className="text-gray-700 font-semibold">
                ক্লাসের সাথে নিয়মিত প্র্যাকটিস করলে বেসিক কনসেপ্ট পরিষ্কার হবে
                এবং আত্মবিশ্বাস বাড়বে।
              </p>
            </div>
            <p className="text-sm text-gray-500 md:text-right">
              — একজন সফল শিক্ষার্থীর অভিজ্ঞতা থেকে
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
