const FaqSession = () => {
  return (
    <div className=" flex flex-col container mx-auto  px-4 py-8">
      <div className=" mb-6">
        <h1 className="text-3xl font-bold text-orange-600">
          🗣️ Frequently Asked Questions
        </h1>
        <p className="text-gray-600 max-w-xl">
          Here are some common questions students ask. If you need more help,
          feel free to contact support.
        </p>
      </div>

      <div className="join join-vertical w-full max-w-2xl bg-[#323051]/40  text-white shadow-md rounded-lg">
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="faq" defaultChecked />
          <div className="collapse-title font-semibold">
            What is StudySphere and how does it work?
          </div>
          <div className="collapse-content text-sm text-gray-700">
            StudySphere is a learning support platform that connects students
            with tutors, study materials, and academic tools to help them
            succeed in their education.
          </div>
        </div>

        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="faq" />
          <div className="collapse-title font-semibold">
            How do I enroll in a course or tutoring session?
          </div>
          <div className="collapse-content text-sm text-gray-700">
            Go to the Courses section, choose a subject, and click "Enroll" or
            "Book Session" to schedule with a tutor.
          </div>
        </div>

        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="faq" />
          <div className="collapse-title font-semibold">
            Are the study materials free to use?
          </div>
          <div className="collapse-content text-sm text-gray-700">
            Many of our resources are free. However, some premium content or
            tutoring services may require a subscription or one-time payment.
          </div>
        </div>

        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="faq" />
          <div className="collapse-title font-semibold">
            How can I contact a tutor or get academic help?
          </div>
          <div className="collapse-content text-sm text-gray-700">
            You can message tutors directly through their profiles or use the
            "Ask a Question" feature from your dashboard.
          </div>
        </div>

        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="faq" />
          <div className="collapse-title font-semibold">
            What should I do if I encounter a technical issue?
          </div>
          <div className="collapse-content text-sm text-gray-700">
            Use the "Help & Support" section to report issues, or email us at
            support@studysphere.com.
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSession;
