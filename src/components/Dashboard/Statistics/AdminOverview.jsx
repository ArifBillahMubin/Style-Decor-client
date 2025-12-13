const AdminOverview = () => {
  return (
    <div className="w-full h-full space-y-10">

      {/* HEADER */}
      <div className="bg-base-100 p-6 rounded-xl shadow border border-base-300">
        <h1 className="text-3xl font-bold text-secondary">
          Admin Control Overview
        </h1>
        <p className="text-gray-500 mt-1">
          Administrative responsibilities, system flow, and operational control.
        </p>
      </div>

      {/* ================= ADMIN WORKFLOW ================= */}
      <Section title="Admin Workflow">
        <div className="flex flex-wrap gap-3">
          {[
            "Manage Users",
            "Approve Payments",
            "Assign Decorators",
            "Monitor Projects",
            "Track Revenue",
            "Complete Orders"
          ].map((item, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </Section>

      {/* ================= ADMIN CONTROLS ================= */}
      <Section title="Admin Controls">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoCard
            title="User & Decorator Control"
            points={[
              "Promote customer to decorator",
              "Remove decorator when no active work",
              "Prevent removal during active booking"
            ]}
          />

          <InfoCard
            title="Service Management"
            points={[
              "Create decoration services",
              "Update service price & category",
              "Delete unused services"
            ]}
          />

          <InfoCard
            title="Booking Control"
            points={[
              "Verify payment",
              "Assign decorator after payment",
              "Cancel unpaid bookings"
            ]}
          />
        </div>
      </Section>

      {/* ================= BOOKING STATUS LOGIC ================= */}
      <Section title="Booking Status Logic (Admin Controlled)">
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Pending → Payment not verified</li>
          <li>Assigned → Decorator assigned</li>
          <li>Planning / Materials / On the way → Working phase</li>
          <li>Completed → Project finished</li>
          <li>Cancelled → Booking closed</li>
        </ul>
      </Section>

      {/* ================= REVENUE & MONITORING ================= */}
      <Section title="Revenue & Monitoring">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoBox
            title="Revenue Calculation"
            text="Only paid bookings are counted as revenue."
          />
          <InfoBox
            title="Working Projects"
            text="All non-completed, assigned bookings are treated as active."
          />
          <InfoBox
            title="Completed Projects"
            text="Completed bookings are final and locked."
          />
          <InfoBox
            title="Unpaid Tracking"
            text="Unpaid bookings are monitored separately for admin action."
          />
        </div>
      </Section>

      {/* ================= ADMIN RULES ================= */}
      <Section title="Admin Operational Rules">
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Decorator cannot be removed if assigned to active booking</li>
          <li>Payment must be confirmed before assignment</li>
          <li>Status must follow defined workflow</li>
          <li>Completed bookings cannot be modified</li>
        </ul>
      </Section>

    </div>
  );
};

export default AdminOverview;

/* ================= REUSABLE UI ================= */

const Section = ({ title, children }) => (
  <div className="bg-base-100 p-6 rounded-xl shadow border border-base-300">
    <h2 className="text-2xl font-bold text-secondary mb-4">
      {title}
    </h2>
    {children}
  </div>
);

const InfoCard = ({ title, points }) => (
  <div className="p-5 border border-base-300 rounded-xl bg-base-200">
    <h3 className="font-semibold text-lg text-secondary mb-3">
      {title}
    </h3>
    <ul className="list-disc ml-5 space-y-1 text-gray-600 text-sm">
      {points.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  </div>
);

const InfoBox = ({ title, text }) => (
  <div className="p-5 border border-base-300 rounded-xl bg-base-200">
    <h3 className="font-semibold text-secondary mb-2">
      {title}
    </h3>
    <p className="text-gray-600 text-sm">{text}</p>
  </div>
);
