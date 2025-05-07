const badgeColors = {
  Video: "from-purple-400 to-indigo-600",
  Article: "from-green-400 to-teal-500",
  PDF: "from-pink-400 to-red-500",
};

const LearningMaterials = () => {
  return (
    <div className="py-12 px-6 bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800">
          🚀 Learning Materials
        </h2>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Browse through handpicked resources designed to sharpen your coding
          skills and deepen your understanding.
        </p>
      </div>

      <div className="space-y-6 max-w-5xl mx-auto">
        {materials.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-start gap-4 bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            <div className="flex-shrink-0 w-full md:w-3/12">
              <div
                className={`inline-block px-4 py-2 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${
                  badgeColors[item.type] || "from-gray-400 to-gray-600"
                }`}
              >
                {item.type}
              </div>
            </div>

            <div className="md:w-9/12">
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const materials = [
  {
    id: 1,
    title: "JavaScript Basics",
    description: "Learn variables, loops, and functions in JavaScript.",
    type: "Video",
  },
  {
    id: 2,
    title: "React Fundamentals",
    description: "Intro to components, props, and state in React.",
    type: "Article",
  },
  {
    id: 3,
    title: "Node.js Crash Course",
    description: "Server-side JavaScript with Express and APIs.",
    type: "Video",
  },
  {
    id: 4,
    title: "HTML & CSS Guide",
    description: "Master the structure and styling of webpages.",
    type: "PDF",
  },
  {
    id: 5,
    title: "MongoDB for Beginners",
    description: "Learn about documents, collections, and queries.",
    type: "Article",
  },
  {
    id: 6,
    title: "Git & GitHub Essentials",
    description: "Version control basics and GitHub workflow.",
    type: "Video",
  },
  {
    id: 7,
    title: "TypeScript Intro",
    description: "Static typing for JavaScript with TypeScript.",
    type: "PDF",
  },
  {
    id: 8,
    title: "API Design Principles",
    description: "RESTful API design best practices.",
    type: "Article",
  },
  {
    id: 9,
    title: "Authentication in Web Apps",
    description: "JWT, OAuth and securing your app.",
    type: "Video",
  },
  {
    id: 10,
    title: "Data Structures in JS",
    description: "Learn arrays, stacks, queues, and more.",
    type: "Article",
  },
];

export default LearningMaterials;
