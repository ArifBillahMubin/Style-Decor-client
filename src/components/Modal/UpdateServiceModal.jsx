import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import UpdateServiceForm from '../Form/UpdateServiceForm'

const UpdateServiceModal = ({ isOpen, setIsEditModalOpen, service, refetch }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setIsEditModalOpen(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-lg bg-white p-6 shadow-xl rounded-2xl"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-red-100 px-3 py-1 rounded-md text-red-600"
              >
                X
              </button>
            </div>

            <DialogTitle
              as="h3"
              className="text-lg font-semibold text-center text-gray-800 mb-4"
            >
              Update Service Info
            </DialogTitle>

            <UpdateServiceForm
              service={service}
              closeModal={() => setIsEditModalOpen(false)}
              refetch={refetch}
            />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default UpdateServiceModal
