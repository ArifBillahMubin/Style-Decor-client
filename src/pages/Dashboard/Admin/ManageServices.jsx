import React from "react";
import AddServices from "../../../components/Form/AddServices";

const ManageServices = () => {
    return (
        <div className="w-full h-full">

            {/* PAGE HEADER */}
            <div className="mb-8 bg-base-100 p-6 rounded-xl shadow-sm border border-base-300">
                <h1 className="text-3xl font-bold text-secondary">
                    Manage Services
                </h1>
                <p className="text-text-secondary mt-1">
                    Create and manage decoration services for the StyleDecor platform.
                </p>
            </div>

            {/* FORM SECTION */}
            <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-300">
                <AddServices />
            </div>

        </div>
    );
};

export default ManageServices;
