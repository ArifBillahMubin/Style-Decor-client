import React from "react";
import AddServices from "../../../components/Form/AddServices";
import ServiceDataRow from "../../../components/Dashboard/TableRows/ServiceDataRow";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const ManageServices = () => {
    // Demo services (will replace with API later)
    const { data: services = [], isLoading } = useQuery({
        queryKey: ['all services'],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/services`);
            return result.data
        }
    })

    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className="w-full h-full">

            {/* PAGE HEADER */}
            <div className="mb-8 bg-base-100 p-6 rounded-xl shadow-sm border border-base-300">
                <h1 className="text-3xl font-bold text-secondary">Manage Services</h1>
                <p className="text-text-secondary mt-1">
                    Create, update and manage all decoration services for StyleDecor.
                </p>
            </div>

            {/* ADD SERVICE FORM */}
            <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-300 mb-10">
                <AddServices />
            </div>

            {/* TABLE SECTION */}
            <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-300 overflow-x-auto">

                <h2 className="text-2xl font-bold text-secondary mb-5">All Services</h2>

                <table className="table w-full">

                    {/* TABLE HEAD */}
                    <thead>
                        <tr className="text-secondary text-sm border-b border-base-300">
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Cost</th>
                            <th>Unit</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>

                    {/* TABLE BODY (Calling your component row-by-row) */}
                    <tbody>
                        {services.map((service) => (
                            <ServiceDataRow key={service._id} service={service} />
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageServices;
