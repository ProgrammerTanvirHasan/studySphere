import Swal from "sweetalert2";

const Author = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Message Sent!",
      text: "Thank you for reaching out. The author will get back to you soon.",
      icon: "success",
      confirmButtonColor: "#f97316",
    });
    e.target.reset();
  };

  return (
    <section className="bg-gradient-to-br from-orange-50 mt-8 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-orange-600 mb-2">
              Connect With the Author
            </h2>
            <p className="text-gray-600">
              Have a question, feedback, or just want to say hello? Drop your
              message below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block mb-1 font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                placeholder="Subject of your message"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-1 font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                required
                placeholder="Write your message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300 shadow-md"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Author;
