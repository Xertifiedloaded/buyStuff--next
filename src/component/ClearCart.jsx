import { useCart } from "@/context/CartContext"
import { MdCleaningServices } from "react-icons/md"

export const ClearCartButton = () => {
  const { clearCart } = useCart()
  return (
    <button
      onClick={clearCart}
      className=""
    >
      Clear Cart

    </button>
  )
}

export default ClearCartButton
