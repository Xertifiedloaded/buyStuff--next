

import { useApiContext } from "@/DashBoard/FetchContext";
import { FaTimes } from "react-icons/fa";
import ProductModal from "./modal-content/ProductModal";
import AdminModal from "./modal-content/AdminModal";
import LocationModal from "./modal-content/LocationModal";
import { BiX } from "react-icons/bi";

export const Modal = () => {
    const { modalContentType,closeModal } = useApiContext()
    let children;

    switch (modalContentType) {
        case 'product':
            children = <ProductModal />
            break;
        case 'admin':
            children = <AdminModal />
            break;
        case 'location':
            children = <LocationModal />
            break;
        default:
            children = <div>Default Content</div>;
    }

    return (
        <div className="fixed left-0 right-0 bottom-0 w-full h-full lg:inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
                <div className="md:p-4 p-3 ">
                    <div className="flex justify-end items-center">
                        <BiX onClick={closeModal} fontSize={30} />
                    </div>
                    {children}
                </div>

            </div>
        </div>
    );
};
