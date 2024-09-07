import lingerie from "../src/assets/pizza.jpg";

const services = [
  {
    title: "Web Development",
    image: lingerie.src,
  },
  {
    title: "Product Design",
    image: lingerie.src,
  },
  {
    title: "Digital Marketing",
    image: lingerie.src,
  },
];

export default function ServiceCards() {
  return (
    <div className="flex flex-row  gap-4 p-4 relative">
      {services.map((service, index) => (
        <div
          key={index}
          className={`relative flex-1 h-[200px] bg-cover bg-center`}
          style={{
            backgroundImage: `url(${service.image})`,
            marginTop: `${index * 20}px`, 
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-white text-xl md:text-2xl font-bold">
              {service.title}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}

