import React from "react"
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaPlane,
  FaWhatsapp,
} from "react-icons/fa"
import { MdLocationOn } from "react-icons/md"

const Footer: React.FC = () => {
  return (
    <>
      <div className="wrapper mt-20 ">
        <footer className=" gap-6 lg:gap-14 justify-between grid-cols-2 grid lg:grid-cols-4">
          <ul>
            <li className=" mb-6 font-bold">Subscribe</li>
            <li className="list">Get 10% off your first order</li>
            <form action="">
              <li className="flex border overflow-hidden box-border  justify-between rounded-md h-[40px] px-2 items-center">
                <input
                  className="bg-transparent w-[80%] block box-border placeholder:text-xs"
                  type="text"
                  placeholder="Enter your email"
                />
                <FaEnvelope width="20%" />
              </li>
            </form>
          </ul>
          <ul>
            <li className="mb-6 font-bold">Support</li>
            <li className="list">
              111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.
            </li>
            <li className="list">exclusive@gmail.com</li>
            <li className="list">+88015-88888-9999</li>
          </ul>
          <ul>
            <li className="mb-6 font-bold">Account</li>
            <li className="list">My Account</li>
            <li className="list">Login / Register</li>
            <li className="list">Cart</li>
            <li className="list">Wishlist</li>
            <li className="list">Shop</li>
          </ul>
          <ul>
            <li className="mb-6 font-bold">Quick Link</li>
            <li className="list">Privacy Policy</li>
            <li className="list">Terms Of Use</li>
            <li className="list">FAQ</li>
            <li className="list">Contact</li>
          </ul>
        </footer>
        <div className="border-t border-gray text-center py-3">
          <small className="text-center">
            Copyright Buystuff 2022 - {new Date().getFullYear()}. All right
            reserved
          </small>
        </div>
      </div>
    </>
  )
}
export default Footer
