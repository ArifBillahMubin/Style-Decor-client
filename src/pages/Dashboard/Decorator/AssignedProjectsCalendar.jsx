import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

/* 🔹 CUSTOM TOOLBAR (Only Month Name) */
const CustomToolbar = ({ date }) => {
    return (
        <div className="text-center mb-3">
            <h2 className="text-2xl font-bold text-secondary">
                {format(date, "MMMM yyyy")}
            </h2>
        </div>
    );
};

const AssignedProjectsCalendar = ({ bookings = [] }) => {
    const events = bookings.map((b) => ({
        title: b.serviceName,
        start: new Date(b.bookingDate),
        end: new Date(b.bookingDate),
        status: b.bookingStatus,
    }));

    return (
        <div className="bg-base-100 rounded-xl shadow border border-base-300 p-4">

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={["month"]}
                components={{
                    toolbar: CustomToolbar, // 🔑 custom toolbar
                }}
                popup={false}
                style={{ height: 520 }}

                /* 🎨 EVENT COLOR BASED ON STATUS */
                eventPropGetter={(event) => {
                    let bg = "#6366F1"; // default (assigned)
                    if (event.status === "completed") bg = "#22C55E";
                    if (event.status === "ona_the_way") bg = "#F59E0B";
                    if (event.status === "setup_in_progress") bg = "#0EA5E9";

                    return {
                        style: {
                            backgroundColor: bg,
                            color: "#fff",
                            borderRadius: "8px",
                            border: "none",
                            padding: "4px 6px",
                            whiteSpace: "normal",
                            lineHeight: "1.2",
                        },
                    };
                }}
            />

            {/* 🔧 LOCAL CSS FIX */}
            <style>
                {`
          .rbc-toolbar {
            display: none;
          }

          .rbc-event {
            font-size: 12px;
          }

          .rbc-event-content {
            white-space: normal !important;
            overflow: visible !important;
          }

          .rbc-date-cell {
            text-align: center;
            font-weight: 600;
          }
        `}
            </style>

        </div>
    );
};

export default AssignedProjectsCalendar;
