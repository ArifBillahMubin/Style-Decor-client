import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssignDecoratorModal = ({ isOpen, closeModal, bookingId, refetch }) => {

    const { data: decorators = [] } = useQuery({
        queryKey: ["assign-decorators"],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/decorator`);
            return res.data;
        },
        enabled: isOpen,
    });

    const handleAssign = (decorator) => {
        axios
            .patch(`${import.meta.env.VITE_API_URL}/admin/bookings/assign/${bookingId}`, {
                decoratorName: decorator.name,
                decoratorEmail: decorator.email,
            })
            .then(() => {
                closeModal();
                refetch();
            });
    };

    return (
        <Dialog open={isOpen} as="div" className="relative z-50" onClose={closeModal}>
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                    <DialogTitle className="text-lg font-semibold text-secondary mb-4">
                        Assign Decorator
                    </DialogTitle>

                    <div className="space-y-3 max-h-72 overflow-y-auto">
                        {decorators.map((d) => (
                            <div
                                key={d._id}
                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-base-200"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={d.imageURL}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-medium">{d.name}</p>
                                        <p className="text-xs text-gray-500">{d.email}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleAssign(d)}
                                    className="px-3 py-1 bg-primary text-white rounded-lg hover:bg-secondary"
                                >
                                    Assign
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 text-right">
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        >
                            Cancel
                        </button>
                    </div>

                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default AssignDecoratorModal;
