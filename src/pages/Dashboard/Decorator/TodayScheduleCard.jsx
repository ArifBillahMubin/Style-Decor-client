const STATUS_LABEL = {
    assigned: "Assigned",
    planning_phase: "Planning Phase",
    materials_prepared: "Materials Prepared",
    ona_the_way: "On the Way",
    setup_in_progress: "Setup in Progress",
    completed: "completed"
};

const STATUS_COLOR = {
    assigned: "bg-blue-100 text-blue-700",
    planning_phase: "bg-yellow-100 text-yellow-700",
    materials_prepared: "bg-purple-100 text-purple-700",
    ona_the_way: "bg-orange-100 text-orange-700",
    setup_in_progress: "bg-green-100 text-green-700",
    completed: "bg-green-100 text-green-700",
};

const TodayScheduleCard = ({ booking }) => {
    const {
        serviceName,
        customer,
        location,
        bookingDate,
        bookingStatus,
    } = booking;

    return (
        <div className="bg-base-100 rounded-xl shadow border border-base-300 p-6">

            {/* TOP ROW */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-secondary">
                        {serviceName}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Customer: {customer?.email}
                    </p>
                </div>

                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLOR[bookingStatus]}`}
                >
                    {STATUS_LABEL[bookingStatus]}
                </span>
            </div>

            {/* INFO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                    <span className="font-medium text-gray-800">Date:</span>{" "}
                    {bookingDate}
                </div>

                <div>
                    <span className="font-medium text-gray-800">Location:</span>{" "}
                    {location}
                </div>
            </div>

            {/* STATUS TIMELINE (VISUAL) */}
            <div className="mt-5">
                <div className="flex items-center gap-2 flex-wrap">
                    {Object.keys(STATUS_LABEL).map((status) => (
                        <span
                            key={status}
                            className={`px-3 py-1 text-xs rounded-full border
                ${status === bookingStatus
                                    ? "bg-primary text-white border-primary"
                                    : "bg-base-200 text-gray-500 border-base-300"
                                }
              `}
                        >
                            {STATUS_LABEL[status]}
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default TodayScheduleCard;
