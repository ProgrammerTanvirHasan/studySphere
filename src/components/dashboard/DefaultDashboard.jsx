const DefaultDashboard = () => {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold text-cyan-700">
        Welcome to Your Dashboard
      </h1>
      <p className="text-gray-700 text-lg">
        This is your central hub for managing all activities within the
        platform.
      </p>

      <div className="space-y-3">
        <p className="text-md">From the sidebar, you can:</p>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>
            <strong>Admins</strong> can view and manage users, study sessions,
            and materials.
          </li>
          <li>
            <strong>Tutors</strong> can create sessions, upload or review
            materials.
          </li>
          <li>
            <strong>Students</strong> can view sessions, book slots, and manage
            notes.
          </li>
        </ul>
      </div>

      <p className="text-gray-600">
        Use the navigation menu on the left to get started. If you're unsure
        what to do next, check the announcements or contact support for help.
      </p>
    </div>
  );
};

export default DefaultDashboard;
