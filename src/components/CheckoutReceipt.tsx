import {
  selectCartItems,
  selectCartTotalPrice,
} from "../redux/cart/cart.slice";
import { useAppSelector } from "../redux/store";

function CheckoutReceipt() {
  const cartItemTotalPrice = useAppSelector(selectCartTotalPrice);
  const cartItems = useAppSelector(selectCartItems);

  const EthereumIcon: any = () => {
    return <i className="pi pi-ethereum"></i>;
  };

  return (
    <div className="sticky  top-[10vh] h-fit md:w-[26%]">
      <h2 className="border-b border-b-gray-300 bg-gray-200 px-4 py-4 text-xl font-bold text-gray-500">
        Order
      </h2>

      <div className="bg-gray-200 py-5 [&>div]:mb-3 [&>div]:px-4 [&>div]:text-sm [&>div]:font-semibold">
        <ul className="border-b border-b-gray-300 bg-gray-200 pb-4 [&>li]:mb-3 [&>li]:px-4 [&>li]:text-sm">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <p className="w-2/3 truncate">
                {item.quantity} {item.name}
              </p>
              <p className="font-semibold">
                <EthereumIcon />
                {(item.price / 1000).toFixed(3)}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-4">
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
    </div>
  );
}
export default CheckoutReceipt;
