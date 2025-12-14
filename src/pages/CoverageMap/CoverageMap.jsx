import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FiSearch } from "react-icons/fi";

const position = [23.8103, 90.4125]; // Bangladesh center

const CoverageMap = () => {
    const [areas, setAreas] = useState([]);
    const mapRef = useRef(null);

    // Load data from public folder
    useEffect(() => {
        fetch("/serviceArea.json")
            .then((res) => res.json())
            .then((data) => setAreas(data))
            .catch((err) => console.error(err));
    }, []);

    // Search handler
    const handleSearch = (e) => {
        e.preventDefault();
        const location = e.target.location.value.toLowerCase();

        const found = areas.find((area) =>
            area.district.toLowerCase().includes(location)
        );

        if (found && mapRef.current) {
            mapRef.current.flyTo(
                [found.latitude, found.longitude],
                12,
                { duration: 1.5 }
            );
        }
    };

    return (
        <section className="min-h-screen bg-base-200 py-16">
            <div className="max-w-7xl mx-auto px-4 space-y-8">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h1 className="text-4xl md:text-5xl font-bold text-secondary">
                        Full Service Coverage Map
                    </h1>
                    <p className="text-gray-500">
                        Explore all districts where StyleDecor currently provides
                        professional decoration services.
                    </p>
                </div>

                {/* Search */}
                <form
                    onSubmit={handleSearch}
                    className="flex justify-center"
                >
                    <div className="join w-full max-w-xl">
                        <div className="relative w-full">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                name="location"
                                type="text"
                                placeholder="Search by district (e.g. Dhaka, Chittagong)"
                                className="
                  input w-full bg-base-100 pl-12
                  rounded-l-full border border-base-300
                  focus:outline-primary
                "
                            />
                        </div>

                        <button
                            type="submit"
                            className="
                btn bg-primary text-white
                font-semibold rounded-r-full px-8
                hover:bg-secondary transition
              "
                        >
                            Search
                        </button>
                    </div>
                </form>

                {/* Map */}
                <div
                    className="
            rounded-2xl overflow-hidden
            border border-base-300
            shadow-xl
            h-[600px]
          "
                >
                    <MapContainer
                        center={position}
                        zoom={7}
                        scrollWheelZoom={true}
                        className="h-full w-full"
                        ref={mapRef}
                    >
                        <TileLayer
                            attribution="&copy; OpenStreetMap contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {areas.map((area, index) => (
                            <Marker
                                key={index}
                                position={[area.latitude, area.longitude]}
                            >
                                <Popup>
                                    <div className="space-y-1">
                                        <strong className="text-base">
                                            {area.city}
                                        </strong>
                                        <p className="text-xs text-gray-600">
                                            District: {area.district}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Covered Areas:
                                            <br />
                                            {area.covered_area.join(", ")}
                                        </p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

            </div>
        </section>
    );
};

export default CoverageMap;