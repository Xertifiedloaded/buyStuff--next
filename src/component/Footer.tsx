import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-footer mt-5 text-sm lg:h-[600px] items-start grid  lg:px-12 xs:p-10 lg:py-[80px] gap-10 xs:grid-cols-1  md:gap-10 sm:gap-2 lg:grid-cols-4 text-white">
        <div className="col1">
          <img src="" alt="" />
          <p className="lg:text-sm lg:leading-[2]">
            At Buystuff, we offer the best in terms of quality and unforgettable
            taste. From our signature shawarma to our classic pizza, our crunchy
            and crispy chicken…
          </p>
          <div className="flex gap-4 mt-3">
            <FaFacebook className="" />
            <FaInstagram />
            <FaWhatsapp />
          </div>
        </div>
        <div className="col2">
          <title>Our Location</title>
          <p className="g:text-sm lg:leading-[2]">Inside Mobil Filling Station, Odo-Eran Obantoko</p>
          <div className="flex text-md  items-center gap-2 mt-4">
            <MdLocationOn />
            <p>Get Location</p>
          </div>
        </div>
        <div className="col2">
          <title>Quick Link</title>
          <p className="mb-7">Home</p>
         <p>Terms Of use</p>
        </div>
        <div className="col2">
          <title>Opening Hours</title>
          <p className="mb-7">Monday to saturday</p>
          <div className="flex text-md  items-center gap-6">
           Sunday
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
