import { CartContextProvider } from "@/hooks/useCart"

const CartProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <CartContextProvider>{children}</CartContextProvider>
  )
}

export default CartProvider