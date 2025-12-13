import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Pagination from "../../../Pagination/Pagination";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useState } from "react";
import DecoratorDataRow from "../../../components/Dashboard/TableRows/DecoratorDataRow";
import CustomerDataRow from "../../../components/Dashboard/TableRows/CustomerDataRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ITEMS_PER_PAGE = 5;

const ManageDecorators = () => {
  const axiosSecure = useAxiosSecure();
  const [customerPage, setCustomerPage] = useState(1);
  const [decoratorPage, setDecoratorPage] = useState(1);

  // CUSTOMERS
  const {
    data: customers = [],
    isLoading: loadingCustomers,
    refetch: refetchCustomers,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/customer`
      );
      return res.data;
    },
  });

  // DECORATORS 
  const {
    data: decorators = [],
    isLoading: loadingDecorators,
    refetch: refetchDecorators,
  } = useQuery({
    queryKey: ["decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/decorator`
      );
      return res.data;
    },
  });

  if (loadingCustomers || loadingDecorators) return <LoadingSpinner />;

  // PAGINATION
  const customerStart = (customerPage - 1) * ITEMS_PER_PAGE;
  const customerPageData = customers.slice(
    customerStart,
    customerStart + ITEMS_PER_PAGE
  );
  const customerTotalPages = Math.ceil(customers.length / ITEMS_PER_PAGE);

  const decoratorStart = (decoratorPage - 1) * ITEMS_PER_PAGE;
  const decoratorPageData = decorators.slice(
    decoratorStart,
    decoratorStart + ITEMS_PER_PAGE
  );
  const decoratorTotalPages = Math.ceil(decorators.length / ITEMS_PER_PAGE);

  return (
    <div className="w-full h-full">

      {/* HEADER */}
      <div className="mb-8 bg-base-100 p-6 rounded-xl shadow-sm border border-base-300">
        <h1 className="text-3xl font-bold text-secondary">
          Manage Decorators
        </h1>
        <p className="text-gray-500 mt-1">
          Monitor decorator workload and manage availability.
        </p>
      </div>

      {/* DECORATORS TABLE */}
      <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-300 mb-10 overflow-x-auto">
        <h2 className="text-2xl font-bold text-secondary mb-5">
          Active Decorators
        </h2>

        <table className="table w-full">
          <thead>
            <tr className="text-secondary text-sm border-b border-base-300">
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Working Projects</th>
              <th className="text-center">Completed Projects</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {decoratorPageData.map((user) => (
              <DecoratorDataRow
                key={user._id}
                user={user}
                refetchCustomers={refetchCustomers}
                refetchDecorators={refetchDecorators}
              />
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={decoratorPage}
          totalPages={decoratorTotalPages}
          setPage={setDecoratorPage}
        />
      </div>

      {/* CUSTOMERS TABLE */}
      <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-base-300 overflow-x-auto">
        <h2 className="text-2xl font-bold text-secondary mb-5">
          Customers
        </h2>

        <table className="table w-full">
          <thead>
            <tr className="text-secondary text-sm border-b border-base-300">
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {customerPageData.map((user) => (
              <CustomerDataRow
                key={user._id}
                user={user}
                refetchCustomers={refetchCustomers}
                refetchDecorators={refetchDecorators}
              />
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={customerPage}
          totalPages={customerTotalPages}
          setPage={setCustomerPage}
        />
      </div>
    </div>
  );
};

export default ManageDecorators;
