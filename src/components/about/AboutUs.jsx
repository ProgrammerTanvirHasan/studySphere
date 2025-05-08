import { RiDoubleQuotesR } from "react-icons/ri";

const AboutUs = () => {
  return (
    <div className="relative bg-gray-50 py-8">
      <div className="bg-[#354895]/90 min-h-[500px] w-[95%] rounded-xl mx-auto relative px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between gap-8 max-w-6xl mx-auto">
          <div className="text-white lg:w-1/2 space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold">
              Why trust StudySphere?
            </h1>
            <p className="text-base md:text-lg leading-relaxed">
              With top mentors, modern learning tools, and clear presentations,
              StudySphere is an ideal learning platform for students. Whether
              it's academic studies or competitive exams — we're here to support
              you.
            </p>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            {[
              "Top-quality content",
              "Easy-to-follow study materials",
              "Great value at low cost",
              "Fluent and clear presentation",
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

        <div className="absolute left-1/2 translate-x-[-50%] bottom-[-80px] min-h-[25vh] w-[90%] md:w-[75vh] bg-white shadow-xl rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-start gap-2">
              <RiDoubleQuotesR className="text-4xl text-orange-500" />
              <p className="text-gray-700 font-semibold">
                Regular practice along with classes helps clarify basic concepts
                and builds confidence.
              </p>
            </div>
            <p className="text-sm text-gray-500 md:text-right">
              — From the experience of a successful student
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
