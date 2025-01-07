const Notification = ({ notice }) => {
  const { subject, note, publishDate } = notice;

  return (
    <div className="bg-neutral-600 glass text-white mt-8 p-4 max-w-96">
      <h2 className="card-title py-2">{subject}</h2>
      <p className="text-zinc-900">{note}</p>
      <p className="py-2 text-red-950 text-lg">Publish Date : {publishDate}</p>
    </div>
  );
};

export default Notification;
