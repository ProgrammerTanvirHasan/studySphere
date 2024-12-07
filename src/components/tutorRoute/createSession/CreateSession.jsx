const CreateSession = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const textarea = form.textarea.value;
    const status = form.status.value;
    const amount = form.amount.value;
    const duration = form.duration.value;
    const classStart = form.classStart.value;

    const classEnd = form.classEnd.value;
    const registrationEnd = form.registrationEnd.value;
    const registrationStart = form.registrationStart.value;

    const details = {
      title,
      textarea,
      status,
      amount,
      duration,
      classStart,
      registrationEnd,
      registrationStart,
      classEnd,
    };
    console.log(details);
  };

  return (
    <div>
      <h2 className="text-center text-2xl bg-orange-400 text-white mt-4">
        Create your session here
      </h2>
      <form onSubmit={handleSubmit} className="bg-green-300 pb-4">
        <div className="mt-8 ">
          <div className="lg:flex lg:ml-24 gap-4">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text"> Session Title</span>
              </div>
              <input
                type="text"
                name="title"
                placeholder="title"
                className="input input-bordered full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text"> Registration start date</span>
              </div>
              <input
                type="date"
                name="registrationStart"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
        </div>

        <div className="lg:flex lg:ml-24 gap-4">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Session Description</span>
            </div>
            <textarea
              placeholder="About"
              name="textarea"
              className="textarea textarea-bordered textarea-md w-full max-w-xs "
            ></textarea>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text"> Registration end date</span>
            </div>
            <input
              type="date"
              name="registrationEnd"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div>
          <div className="lg:flex lg:ml-24 gap-4">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Status</span>
              </div>
              <input
                type="text"
                name="status"
                placeholder="Type here"
                defaultValue={"Pending"}
                className="input input-bordered full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Class start date</span>
              </div>
              <input
                type="date"
                name="classStart"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>

          <div className="lg:flex lg:ml-24 gap-4">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text"> Registration fee</span>
              </div>

              <input
                type="number"
                name="amount"
                defaultValue={0}
                className="input input-bordered w-full max-w-xs"
                min="0"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Class end date</span>
              </div>
              <input
                type="date"
                name="classEnd"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="lg:ml-24">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Class Duration</span>
              </div>
              <input
                type="number"
                min={0}
                name="duration"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
        </div>
        <div className="text-center mt-4">
          <button className="btn w-60 bg-green-500 text-black text-xl">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSession;
