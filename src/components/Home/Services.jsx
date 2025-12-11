import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "../Shared/Container";
import ServiceCard from "./ServiceCard";
import { Link } from "react-router";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Services = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["landing-services"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/services-home-filter`,
        {
          params: {
            limit: 6,       // only 6 services from backend
            sort: "rating",   // sort by rating
          },
        }
      );
      return res.data;
    },
  });

  const services = data?.services || [];

  return (
    <section className="py-16 bg-base-100">
      <Container>
        <h2 className="text-4xl font-bold text-secondary text-center mb-4">
          Popular Decoration Services
        </h2>
        <p className="text-gray-500 text-center mb-10">
          Explore our top-rated decoration packages
        </p>

        {isLoading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500 }}
              spaceBetween={25}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {services.map((service) => (
                <SwiperSlide key={service._id}>
                  <ServiceCard service={service} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* VIEW ALL BUTTON */}
            <div className="text-center mt-12">
              <Link
                to="/services"
                className="
                  inline-block px-8 py-3 bg-primary text-white 
                  rounded-lg shadow-md hover:bg-secondary 
                  transition font-medium
                "
              >
                View All Services
              </Link>
            </div>
          </>
        )}
      </Container>
    </section>
  );
};

export default Services;
