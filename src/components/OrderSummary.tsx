import { selectCartTotalPrice } from "../redux/cart/cart.slice";
import { useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";

function OrderSummary() {
  const navigate = useNavigate()
  const cartItemTotalPrice = useAppSelector(selectCartTotalPrice);

  const EthereumIcon: any = () => {
    return <i className="pi pi-ethereum"></i>;
  };

  return (
    <div className="sticky  top-[10vh] h-fit md:w-[26%]">
      <h2 className="border-b border-b-gray-300 bg-gray-200 px-4 py-4 text-xl font-bold text-gray-500">
        Order Summary
      </h2>
      <div className="bg-gray-200 py-5 [&>div]:mb-3 [&>div]:px-4 [&>div]:text-sm">
        <div className="flex items-center justify-between">
          <p>Subtotal</p>
          <p className="">
            <EthereumIcon />
            {cartItemTotalPrice}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>Shipping</p>
          <p className="">
            <EthereumIcon />
            00
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-green-500">Discount</p>
          <p className="text-green-500">
            <EthereumIcon />
            00
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between bg-gray-300 px-4 py-3">
        <h2 className="font-bold">Total</h2>
        <h2 className="font-bold">
          <EthereumIcon />
          {cartItemTotalPrice}
        </h2>
      </div>
      <button
        onClick={()=>navigate('/checkout')}
        className="mt-4 w-full bg-blue-500 py-3 text-center font-bold text-white"
      >
        Checkout
      </button>
    </div>
  );
}
export default OrderSummary;
