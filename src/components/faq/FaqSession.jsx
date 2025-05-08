const FaqSession = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between container mx-auto px-4 py-8 gap-8">
      <div className="flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-orange-600">
            🗣️ Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-xl">
            Here are some common questions students ask. If you need more help,
            feel free to contact support.
          </p>
        </div>

        <div className="join join-vertical w-full max-w-2xl bg-[#323051]/40 text-white shadow-md rounded-lg">
          {[
            {
              q: "What is StudySphere and how does it work?",
              a: "StudySphere is a learning support platform that connects students with tutors, study materials, and academic tools to help them succeed in their education.",
            },
            {
              q: "How do I enroll in a course or tutoring session?",
              a: 'Go to the Courses section, choose a subject, and click "Enroll" or "Book Session" to schedule with a tutor.',
            },
            {
              q: "Are the study materials free to use?",
              a: "Many of our resources are free. However, some premium content or tutoring services may require a subscription or one-time payment.",
            },
            {
              q: "How can I contact a tutor or get academic help?",
              a: 'You can message tutors directly through their profiles or use the "Ask a Question" feature from your dashboard.',
            },
            {
              q: "What should I do if I encounter a technical issue?",
              a: 'Use the "Help & Support" section to report issues, or email us at support@studysphere.com.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="collapse collapse-arrow join-item border border-base-300"
            >
              <input type="radio" name="faq" defaultChecked={idx === 0} />
              <div className="collapse-title font-semibold">{item.q}</div>
              <div className="collapse-content text-sm text-gray-700">
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <img
          src="https://i.ibb.co.com/ch0YmRmf/man-thinking-sitting-big-question-mark-concept-illustration-294791-685.jpg"
          alt="Man thinking illustration"
          className="w-full max-w-md h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default FaqSession;
