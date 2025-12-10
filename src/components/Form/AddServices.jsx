const AddServices = () => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center 
    bg-base-200 rounded-xl">

      <form className="bg-base-100 w-full max-w-5xl p-10 rounded-xl shadow-lg border border-base-300">

        <h2 className="text-3xl font-semibold text-secondary mb-8">
          Add New Decoration Service
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            {/* Service Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="service_name" className="block text-text-primary">
                Service Name
              </label>
              <input
                className="w-full px-4 py-3 border border-base-300 rounded-md 
                focus:outline-primary bg-base-100"
                name="service_name"
                id="service_name"
                type="text"
                placeholder="e.g., Wedding Stage Decoration"
                required
              />
            </div>

            {/* Service Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-text-primary">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border border-base-300 rounded-md 
                bg-base-100 focus:outline-primary"
                name="category"
              >
                <option value="home">Home Decoration</option>
                <option value="wedding">Wedding</option>
                <option value="office">Office</option>
                <option value="seminar">Seminar</option>
                <option value="ceremony">Ceremony</option>
                <option value="birthday">Birthday Events</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-text-primary">
                Description
              </label>

              <textarea
                id="description"
                placeholder="Describe the decoration service..."
                className="block rounded-md w-full h-32 px-4 py-3 border border-base-300 
                bg-base-100 focus:outline-primary"
                name="description"
              ></textarea>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6 flex flex-col">

            {/* Cost & Unit */}
            <div className="flex justify-between gap-2">

              {/* Cost */}
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="cost" className="block text-text-primary">
                  Cost (BDT)
                </label>
                <input
                  className="w-full px-4 py-3 border border-base-300 rounded-md 
                  bg-base-100 focus:outline-primary"
                  name="cost"
                  id="cost"
                  type="number"
                  placeholder="e.g., 15000"
                  required
                />
              </div>

              {/* Unit */}
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="unit" className="block text-text-primary">
                  Unit
                </label>
                <input
                  className="w-full px-4 py-3 border border-base-300 rounded-md 
                  bg-base-100 focus:outline-primary"
                  name="unit"
                  id="unit"
                  type="text"
                  placeholder="e.g., per event / per sqft"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="p-4 w-full rounded-lg border border-base-300 bg-base-100">
              <label className="block text-text-primary mb-2">Service Image</label>

              <div className="file_upload px-5 py-3 border-2 border-dotted border-base-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                    />
                    <div className="bg-primary text-white rounded font-semibold cursor-pointer p-2 px-5 
                    hover:bg-secondary transition">
                      Upload Image
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer p-3 mt-3 text-center font-medium text-white 
              rounded-md bg-primary hover:bg-secondary transition shadow-md"
            >
              Save Service
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddServices;
