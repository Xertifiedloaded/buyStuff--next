
import Image from "next/image"
import Link from "next/link"

const Banner = () => {
  return (
    <section className="relative w-full h-screen bg-black text-white   flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/woman.svg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="opacity-60 "
        />
      </div>

      <div className="relative text-white z-10 text-center max-w-3xl px-4">
        <h1 className="text-4xl  md:text-6xl font-bold mb-4">
          Discover the Latest Trends in Fashion
        </h1>
        <p className="text-lg md:text-sm mb-8">
          Shop the latest collection with amazing deals and offers.
        </p>
        <Link
          className="inline-block px-8 py-3 bg-white text-black rounded-md shadow-md hover:bg-gray-100 transition"
          href="/shop"
        >
          Shop Now
        </Link>
      </div>
    </section>
  )
}

export default Banner
