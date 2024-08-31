import toast from "react-hot-toast";
import { addToCart } from "../redux/cart/cart.slice";
import { Product } from "../redux/products/product.request";
import { useAppDispatch } from "../redux/store";

function ProductCard(props: Product) {
  const dispatch = useAppDispatch();
  const newPrice = props.price / 1000;
  const handleClick = () => {
    toast.success("Added to Cart");
    dispatch(addToCart(props));
  };
  const EthereumIcon: any = () => {
    return <i className="pi pi-ethereum text-stone-200"></i>;
  };
  return (
    <div className="rounded-xl overflow-hidden bg-white fade__in shadow-md">
      <div className="h-72 flex justify-center items-center relative">
        <span className="absolute top-5 right-5 border border-white  z-10 text-white px-2 ">
          <EthereumIcon />
          {newPrice.toFixed(3)}
        </span>
        <img
          className="h-full brightness-[.9]  w-full block object-cover object-top "
          src={props.image}
          alt={props.description}
        />
        <button
          onClick={handleClick}
          className="rounded-full w-11 h-11 absolute bottom-0 right-3 translate-y-1/2 flex justify-center items-center bg-white p-3 shadow-lg active:scale-95"
        >
          <img className="w-full invert-[.7]" src="/cart.svg" alt="" />
        </button>
      </div>
      <div className="px-4 pt-6 pb-7 h-30">
        <h2 className="text-lg  text-gray-500 font-extrabold mb-3">
          {props.name}
        </h2>
        <p className="text-sm text-gray-400">{props.description}</p>
      </div>
    </div>
  );
}
export default ProductCard;
