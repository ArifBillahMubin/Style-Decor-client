const Pagination = ({ currentPage, totalPages, setPage }) => {
    return (
        <div className="flex justify-center gap-3 mt-6">

            {/* PREV BUTTON */}
            <button
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className={`px-4 py-2 rounded-lg border shadow 
          ${currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-secondary hover:bg-secondary hover:text-white"}`}
            >
                Prev
            </button>

            {/* PAGE NUMBERS */}
            {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => setPage(idx + 1)}
                    className={`px-4 py-2 rounded-lg border 
            ${currentPage === idx + 1
                            ? "bg-primary text-white"
                            : "bg-white text-secondary hover:bg-secondary hover:text-white"}
          `}
                >
                    {idx + 1}
                </button>
            ))}

            {/* NEXT BUTTON */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => setPage(currentPage + 1)}
                className={`px-4 py-2 rounded-lg border shadow 
          ${currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-secondary hover:bg-secondary hover:text-white"}`}
            >
                Next
            </button>

        </div>
    );
};

export default Pagination;
