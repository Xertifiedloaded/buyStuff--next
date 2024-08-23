import React from "react";
import { PiBowlFoodLight } from "react-icons/pi";
import Image from "next/image";

export default function ReuseableSectionGrid({
  heroImg,
  secondHeroImg,
  heroContent,
  styleContent,
  btnContent,
  content,
}) {
  return (
    <>
      <section className="wrapper my-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div
            className={`bg-red-300 hidden  md:block  h-full overflow-hidden rounded-xl  `}
          >
            <Image
              src={heroImg}
              className="h-full hidden lg:block  bg-red-300 w-full object-cover"
              alt="background Image"
              height={500}
              width={500}
            />
          </div>
          <div className={` flex flex-col gap-8 h-full`}>
            <div className="h-56 bg-red-300 overflow-hidden rounded-xl">
              <Image
                src={secondHeroImg}
                className="h-full w-full object-cover"
                alt="background Image"
                height={500}
                width={500}
              />
            </div>
            <div className="flex flex-col gap-8">
              <div className="h-56 bg-red-300 overflow-hidden rounded-xl">
                <Image
                  src={secondHeroImg}
                  className="h-full w-full object-cover"
                  alt="background Image"
                  height={500}
                  width={500}
                />
              </div>
              {content}
              {btnContent}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
