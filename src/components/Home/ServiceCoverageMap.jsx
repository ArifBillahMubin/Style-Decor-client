import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router";

const position = [23.8103, 90.4125]; // Bangladesh center

const ServiceCoveragePreview = () => {
    const [areas, setAreas] = useState([]);
    const mapRef = useRef(null);

    // Load data from public folder
    useEffect(() => {
        fetch("/serviceArea.json")
            .then((res) => res.json())
            .then((data) => setAreas(data))
            .catch((err) => console.error(err));
    }, []);


    return (
        <section className="py-20 bg-base-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
                    <h2 className="text-4xl font-bold text-secondary">
                        Service Coverage Area
                    </h2>
                    <p className="text-gray-500">
                        We provide professional decoration services across major districts
                        in Bangladesh.
                    </p>
                </div>


                {/* Map */}
                <div
                    className="
            rounded-2xl overflow-hidden
            border border-base-300
            shadow-lg
            h-[420px] md:h-[500px]
          "
                >
                    <MapContainer
                        center={position}
                        zoom={7}
                        scrollWheelZoom={false}
                        className="h-full w-full overflow-hidden z-2"
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
                                    <strong>{area.city}</strong>
                                    <br />
                                    Covered Areas: {area.covered_area.join(", ")}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>


                <div className="text-center mt-8">
                    <Link
                        to="/coverage"
                        className="btn btn-outline btn-primary"
                    >
                        View Full Coverage Map
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default ServiceCoveragePreview;
