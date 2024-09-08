import { FaTruckPickup } from "react-icons/fa"
import { MdAddModerator, MdSecurity } from "react-icons/md"

export const collections = [
  {
    name: "Products",
    path: "/dashboard/products",
  },
  {
    name: "Orders Received",
    path: "/dashboard/orders",
  },
  {
    name: "Available Location",
    path: "/dashboard/location",
  },
  {
    name: "Edit Admin",
    path: "/dashboard/admin",
  },
]

export const datum = [
  {
    icon: <FaTruckPickup color="black" fontSize='25px'/>,
    heading: "FREE AND FAST DELIVERY",
    para: "Free delivery for all orders over $140",
  },
  {
    icon: <MdAddModerator color="black" fontSize='25px'/>,
    heading: "24/7 CUSTOMER SERVICE",
    para: "Friendly 24/7 customer support",
  },
  {
    icon: <MdSecurity color="black" fontSize='25px'/>,
    heading: "MONEY BACK GUARANTEE",
    para: "We return money within 30 days",
  },
]
