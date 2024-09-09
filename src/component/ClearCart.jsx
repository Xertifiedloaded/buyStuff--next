import { useCart } from "@/context/CartContext"

export const ClearCartButton = () => {
  const { clearCart } = useCart()
  return (
    <button
      onClick={clearCart}
      className="bg-red-500 text-white px-2 font-600 text-xs rounded"
    >
      Clear Cart
    </button>
  )
}

export default ClearCartButton
