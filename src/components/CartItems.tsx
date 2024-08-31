import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/cart/cart.slice";
import { Product } from "../redux/products/product.request";
import { useAppDispatch } from "../redux/store";

function CartItems(props: Product) {
  const dispatch = useAppDispatch();
  const newPrice = props.price / 1000;

  const handleIncreaseBtn = () => {
    dispatch(increaseQuantity(props.id));
  };
  const handleDecreaseBtn = () => {
    dispatch(decreaseQuantity(props.id));
  };
  const handleRemoveCartItem = () => {
    dispatch(removeFromCart(props.id));
  };

  const EthereumIcon: any = () => {
    return <i className="pi pi-ethereum"></i>;
  };
  return (
    <div className=" mb-4 mt-4 grid grid-cols-cart_container_sm border-b border-b-slate-300 pb-5 md:grid-cols-cart_container_md">
      <div className="relative flex gap-4">
        <img
          className="block h-20 w-24 object-cover object-top brightness-75"
          src={props.image}
          alt={props.description}
        />
        <p className="absolute left-12 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white md:hidden ">
          X{props.quantity}
        </p>
        <div>
          <h2 className="font-semibold text-gray-700">{props.name}</h2>
          <p className="text-sm text-gray-400">{props.category}</p>
        </div>
      </div>
      <p className="hidden font-bold text-gray-500 md:block ">
        <EthereumIcon />
        {newPrice.toFixed(3)}
      </p>
      <div className="hidden h-fit w-fit items-center gap-4 rounded-2xl bg-gray-200 px-3 py-1 md:flex">
        <img
          onClick={handleDecreaseBtn}
          className="block w-4 cursor-pointer py-1 invert-[.5]"
          src="/minus.svg"
          alt="minus-icon"
        />
        <p className=" text-sm font-semibold">{props.quantity}</p>
        <img
          onClick={handleIncreaseBtn}
          className="block w-4 cursor-pointer py-1 invert-[.5]"
          src="/plus.svg"
          alt="plus-icon"
        />
      </div>
      <div>
        <EthereumIcon />
        {(props.quantity * newPrice).toFixed(3)}
      </div>
      <button
        onClick={handleRemoveCartItem}
        className="h-7 w-7 rounded-full bg-gray-300 p-[.3rem]"
      >
        <img
          className="rotate-45 brightness-200 invert"
          src="/plus.svg"
          alt=""
        />
      </button>
    </div>
  );
}
export default CartItems;
