const DecoratorOverview = () => {
  return (
    <div className="w-full h-full space-y-10">

      {/* HEADER */}
      <div className="bg-base-100 p-6 rounded-xl shadow border border-base-300">
        <h1 className="text-3xl font-bold text-secondary">
          Decorator Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">
          Decorator responsibilities, project workflow, and operational rules.
        </p>
      </div>

      {/* ================= DECORATOR WORKFLOW ================= */}
      <Section title="Decorator Workflow">
        <div className="flex flex-wrap gap-3">
          {[
            "View Assigned Projects",
            "Check Today's Schedule",
            "Update Project Status",
            "Complete Decoration Work",
            "Track Earnings"
          ].map((item, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </Section>

      {/* ================= RESPONSIBILITIES ================= */}
      <Section title="Decorator Responsibilities">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <InfoCard
            title="Assigned Projects"
            points={[
              "View only assigned bookings",
              "Cannot access unassigned projects",
              "Project details are read-only"
            ]}
          />

          <InfoCard
            title="Project Execution"
            points={[
              "Prepare materials",
              "Reach venue on time",
              "Complete setup professionally"
            ]}
          />

          <InfoCard
            title="Status Updates"
            points={[
              "Update project status step-by-step",
              "Cannot skip workflow stages",
              "Final status must be completed"
            ]}
          />

        </div>
      </Section>

      {/* ================= PROJECT STATUS FLOW ================= */}
      <Section title="Project Status Flow (Decorator Controlled)">
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Assigned → Project received</li>
          <li>Planning Phase → Design & preparation</li>
          <li>Materials Prepared → Ready to start</li>
          <li>On the Way → Traveling to venue</li>
          <li>Setup in Progress → Decoration ongoing</li>
          <li>Completed → Work finished</li>
        </ul>
      </Section>

      {/* ================= SCHEDULE MANAGEMENT ================= */}
      <Section title="Schedule & Time Management">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoBox
            title="Today's Schedule"
            text="Shows all projects scheduled for today in calendar view."
          />
          <InfoBox
            title="Calendar View"
            text="Helps decorators manage multiple projects efficiently."
          />
        </div>
      </Section>

      {/* ================= EARNINGS ================= */}
      <Section title="Earnings Summary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoBox
            title="Earning Calculation"
            text="Earnings are calculated only from completed projects."
          />
          <InfoBox
            title="Pending Earnings"
            text="Ongoing projects do not count as earnings."
          />
        </div>
      </Section>

      {/* ================= DECORATOR RULES ================= */}
      <Section title="Decorator Rules & Limitations">
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Cannot cancel assigned bookings</li>
          <li>Cannot change service price or details</li>
          <li>Cannot assign projects to others</li>
          <li>Status must follow defined workflow</li>
          <li>Admin approval required for role removal</li>
        </ul>
      </Section>

    </div>
  );
};

export default DecoratorOverview;

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

