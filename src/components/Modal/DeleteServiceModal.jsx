import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const DeleteServiceModal = ({ isOpen, closeModal, id, refetch}) => {
  const axiosSecure = useAxiosSecure();
  const deleteService = async () => {
    return await axiosSecure.delete(`/services/${id}`);
  };

  const mutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      toast.success("Service deleted");
      closeModal();
      if (refetch) refetch();
    },
    onError: () => {
      toast.error("Failed to delete");
    }
  });

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-10">
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
          <DialogTitle className="text-lg font-semibold">Are you sure?</DialogTitle>

          <p className="text-sm text-gray-500 mt-2">
            You cannot undo this action.
          </p>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => mutation.mutate()}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              {mutation.isPending ? "Deleting..." : "Yes"}
            </button>

            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              No
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
export default DeleteServiceModal;
