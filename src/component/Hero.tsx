// components/HeroSection.jsx
import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-800 text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/lingerie.jpeg"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      <div className="relative flex flex-col items-center justify-center min-h-screen py-12 px-6 md:px-12 text-center">
        <h1 className="text-white text-3xl lg:text-8xl font-bold">
          Welcome <span className="text-red-600 capitalize">to</span> BuyStuff
        </h1>
        <h4 className=" md:text-3xl lg:text-4xl mt-8 font-extrabold leading-tight mb-4">
          Discover Your Next Favorite Lingerie
        </h4>
        <div className="flex justify-center my-6">
            <div className="h-[100px] border border-red-600 border-t-0 border-b-0 border-l-0" />
          </div>
        <a
          href="/shop"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
