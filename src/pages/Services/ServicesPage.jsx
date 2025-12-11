import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Container from "../../components/Shared/Container";
import ServiceCard from "../../components/Home/ServiceCard";
import FilterChip from "../../components/Services/FilterChip";
import SkeletonCard from "../../components/Services/SkeletonCard";

const ServicesPage = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [minBudget, setMinBudget] = useState("");
    const [maxBudget, setMaxBudget] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);

    // Applied filter state
    const [filters, setFilters] = useState({
        search: "",
        category: "",
        min: "",
        max: "",
        sort: "",
        page: 1,
    });

    const handleApplyFilter = () => {
        setFilters({
            search,
            category,
            min: minBudget,
            max: maxBudget,
            sort,
            page,
        });
    };

    const handleReset = () => {
        setSearch("");
        setCategory("");
        setMinBudget("");
        setMaxBudget("");
        setSort("");
        setPage(1);

        setFilters({
            search: "",
            category: "",
            min: "",
            max: "",
            sort: "",
            page: 1,
        });
    };

    const { data, isLoading } = useQuery({
        queryKey: ["services-advanced", filters],
        queryFn: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/services-filter`,
                { params: filters }
            );
            return res.data;
        },
    });

    const services = data?.services || [];
    const totalPages = data?.totalPages || 1;

    return (
        <Container>
            <div className="pt-24 pb-20">

                {/* PAGE TITLE */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight text-secondary">
                        Explore Our Services
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg">
                        Find the perfect decoration service for your event.
                    </p>
                </div>

                {/* MODERN FILTER BAR */}
                <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-200 grid grid-cols-1 md:grid-cols-5 gap-6 mb-10 transition-all">

                    {/* Search */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600">Search</label>
                        <input
                            type="text"
                            placeholder="Search service…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg bg-base-100 focus:ring-2 focus:ring-primary/40 focus:outline-none"
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg bg-base-100 focus:ring-2 focus:ring-primary/40 focus:outline-none"
                        >
                            <option value="">All</option>
                            <option value="home">Home Decoration</option>
                            <option value="wedding">Wedding</option>
                            <option value="ceremony">Ceremony</option>
                            <option value="birthday">Birthday</option>
                            <option value="seminar">Seminar</option>
                            <option value="office">Office Decoration</option>
                        </select>
                    </div>

                    {/* Min Budget */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600">Min Budget</label>
                        <input
                            type="number"
                            placeholder="0"
                            value={minBudget}
                            onChange={(e) => setMinBudget(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg bg-base-100 focus:ring-2 focus:ring-primary/40 focus:outline-none"
                        />
                    </div>

                    {/* Max Budget */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600">Max Budget</label>
                        <input
                            type="number"
                            placeholder="50000"
                            value={maxBudget}
                            onChange={(e) => setMaxBudget(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg bg-base-100 focus:ring-2 focus:ring-primary/40 focus:outline-none"
                        />
                    </div>

                    {/* Sorting */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-600">Sort by Price</label>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg bg-base-100 focus:ring-2 focus:ring-primary/40 focus:outline-none"
                        >
                            <option value="">Default</option>
                            <option value="asc">Low → High</option>
                            <option value="desc">High → Low</option>
                        </select>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={handleApplyFilter}
                        className="px-8 py-3 rounded-xl bg-primary text-white font-medium shadow-md hover:bg-secondary transition-all"
                    >
                        Apply Filters
                    </button>

                    <button
                        onClick={handleReset}
                        className="px-8 py-3 rounded-xl bg-gray-200 text-gray-800 font-medium shadow hover:bg-gray-300 transition"
                    >
                        Reset
                    </button>
                </div>

                {/* FILTER CHIPS */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {filters.search && <FilterChip label={filters.search} />}
                    {filters.category && <FilterChip label={filters.category} />}
                    {filters.min && <FilterChip label={`Min: ${filters.min}`} />}
                    {filters.max && <FilterChip label={`Max: ${filters.max}`} />}
                    {filters.sort && <FilterChip label={`Sort: ${filters.sort}`} />}
                </div>

                {/* SKELETON LOADING */}
                {isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                )}
                
                {/* NO SERVICES FOUND */}
                {!isLoading && services.length === 0 && (
                    <div className="py-24 text-center">
                        <h2 className="text-3xl font-bold text-gray-700 mb-2 tracking-tight">
                            Nothing to Show Here
                        </h2>

                        <p className="text-gray-500 max-w-xl mx-auto text-lg">
                            Your applied filters didn’t match any service. Please adjust and try again.
                        </p>
                    </div>
                )}

                {/* SERVICES GRID */}
                {!isLoading && (
                    <div className="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
            gap-10
          ">
                        {services.map((service) => (
                            <ServiceCard key={service._id} service={service} />
                        ))}
                    </div>
                )}

                {/* PAGINATION */}
                <div className="flex justify-center gap-3 mt-14">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setPage(i + 1);
                                setFilters((prev) => ({ ...prev, page: i + 1 }));
                            }}
                            className={`
                px-4 py-2 rounded-lg border transition-all
                ${page === i + 1
                                    ? "bg-primary text-white shadow"
                                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"}
              `}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

            </div>
        </Container>
    );
};

export default ServicesPage;
