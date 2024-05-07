import { NavLink, useParams } from "react-router-dom";
import {
  selectCategories,
  selectProductsStatus,
} from "../redux/products/products.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Fragment, useEffect, useState } from "react";
import { fetchProducts } from "../redux/products/product.request";
import { selectCartItems } from "../redux/cart/cart.slice";

const activeClassNames =
  "before:absolute 	before:-bottom-1 before:left-0 before:h-[2px] bp before:w-full before:bg-white";

function NavBar() {
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const productStatus = useAppSelector(selectProductsStatus);
  const { category: currentCategory } = useParams();

  const [showNav, setShowNav] = useState(false);

  const handleShowNavBar = () => {
    setShowNav(!showNav);
  };

  useEffect(() => {
    if (productStatus == "idle") {
      dispatch(fetchProducts());
    }
  }, []);
  return (
    <nav className=" fixed left-0 top-0 z-10 flex h-[10vh] w-full  items-center justify-between px-5  py-1">
      <NavLink to="/" className="flex items-center justify-between gap-1">
        <img className="w-6 brightness-200 invert" src="/logo.svg" alt="" />
        <h2 className="font-jersey  text-2xl text-white">Visaro</h2>
      </NavLink>
      <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-8 md:flex">
        {categories.map((category, index) => (
          <NavLink
            key={index}
            className={`relative capitalize ${
              currentCategory == category && activeClassNames
            }  text-white`}
            to={`/category/${category}`}
          >
            {category}
          </NavLink>
        ))}
      </div>
      <NavLink
        to="/cart"
        className="relative ml-auto mr-3 flex items-center justify-center"
      >
        <img className="w-8 brightness-200 invert" src="/cart.svg" alt="" />
        <span className="absolute -right-2 top-0 flex h-5  w-5 -translate-y-1/2 items-center justify-center rounded-full bg-blue-400 text-sm font-semibold text-white	">
          {cartItems.length}
        </span>
      </NavLink>
      <button onClick={handleShowNavBar} className="z-10 block md:hidden">
        <img className="w-8 brightness-200 invert" src="/menu.svg" alt="" />
      </button>
      {showNav && (
        <Fragment>
          <div
            onClick={handleShowNavBar}
            className="fixed left-0 top-0 z-50 h-screen w-full bg-gray-400 opacity-60"
          />
          <div className=" fixed right-0 top-0    z-50 h-screen w-[75%] min-w-[15rem] gap-8 bg-white pt-12 md:hidden">
            <NavLink to="/" className="flex items-center justify-center gap-1">
              <img
                className="w-6 brightness-200 invert-[.5]"
                src="/logo.svg"
                alt=""
              />
              <h2 className="font-jersey  text-2xl text-gray-700">Visaro</h2>
            </NavLink>
            <div className="mt-12 pl-12">
              {categories.map((category, index) => (
                <NavLink
                  key={index}
                  className={`relative 	mb-4  block  pl-3 text-3xl  font-extrabold capitalize text-gray-500 before:absolute before:-bottom-1 before:-left-4 before:top-1/2 before:h-3 before:w-3 before:-translate-y-1/2 before:rounded-full before:bg-gray-500 ${
                    currentCategory == category ? "opacity-100" : "opacity-50"
                  } `}
                  to={`/category/${category}`}
                  onClick={() => setShowNav(false)}
                >
                  {category}
                </NavLink>
              ))}
            </div>
            <p className="absolute  bottom-8 left-0 mb-[9vh]  block w-full text-center text-sm text-gray-400">
              All right reserved {new Date().getFullYear()}
            </p>
          </div>
        </Fragment>
      )}
    </nav>
  );
}
export default NavBar;
