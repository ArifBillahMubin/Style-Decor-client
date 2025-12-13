const CustomerOverview = () => {
  return (
    <div className="w-full h-full space-y-10">

      {/* HEADER */}
      <div className="bg-base-100 p-6 rounded-xl shadow border border-base-300">
        <h1 className="text-3xl font-bold text-secondary">
          Customer Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">
          Customer activities, booking workflow, and payment process.
        </p>
      </div>

      {/* ================= CUSTOMER WORKFLOW ================= */}
      <Section title="Customer Workflow">
        <div className="flex flex-wrap gap-3">
          {[
            "Browse Decoration Services",
            "Book Service",
            "Make Payment",
            "Track Booking Status",
            "View Payment History"
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

      {/* ================= CUSTOMER FEATURES ================= */}
      <Section title="Customer Features">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <InfoCard
            title="My Bookings"
            points={[
              "View all booked services",
              "See booking date and service details",
              "Track assigned decorator"
            ]}
          />

          <InfoCard
            title="Booking Cancellation"
            points={[
              "Cancellation allowed only in pending state",
              "Cannot cancel after payment",
              "Protects decorator workflow"
            ]}
          />

          <InfoCard
            title="Booking Tracking"
            points={[
              "Real-time status updates",
              "Decorator progress visible",
              "Clear workflow stages"
            ]}
          />

        </div>
      </Section>

      {/* ================= BOOKING STATUS FLOW ================= */}
      <Section title="Booking Status Flow (System Controlled)">
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Pending → Booking created</li>
          <li>Assigned → Decorator assigned</li>
          <li>Planning Phase → Preparation started</li>
          <li>Materials Prepared → Ready for execution</li>
          <li>On the Way → Decorator traveling</li>
          <li>Setup in Progress → Decoration ongoing</li>
          <li>Completed → Service finished</li>
          <li>Cancelled → Booking cancelled</li>
        </ul>
      </Section>

      {/* ================= PAYMENT ================= */}
      <Section title="Payment & History">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoBox
            title="Secure Payment"
            text="Customers complete payments securely before decorator assignment."
          />
          <InfoBox
            title="Payment History"
            text="All transactions are recorded with date, amount, and transaction ID."
          />
        </div>
      </Section>

      {/* ================= CUSTOMER RULES ================= */}
      <Section title="Customer Rules & Limitations">
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Cannot modify service details after booking</li>
          <li>Cannot cancel after payment is completed</li>
          <li>Cannot change assigned decorator</li>
          <li>Booking status is system controlled</li>
          <li>Refunds depend on admin approval</li>
        </ul>
      </Section>

    </div>
  );
};

export default CustomerOverview;

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
