import { useAppSelector } from "../redux/store";
import ProductCard from "../components/ProductCard";
import { selectProducts } from "../redux/products/products.slice";
import { Fragment } from "react/jsx-runtime";
import { useParams } from "react-router-dom";

const currentImage = {
  "men's": "/men-bg.jpg",
  "women's": "/women-bg.jpg",
  glasses: "/glass-bg.jpg",
  hats: "/hat-bg.jpg",
};

function Home() {
  const products = useAppSelector(selectProducts);
  const { category: currentCategory } = useParams<{
    category: keyof typeof currentImage;
  }>();

  console.log(products)

  return (
    <Fragment>
      <header className="fade__in relative flex h-[30rem] items-center justify-center">
        <h1 className="z-[3] text-center font-jersey text-5xl font-bold uppercase text-white md:text-9xl">
          {currentCategory ? `${currentCategory} shop` : "visaro"}
        </h1>
        <img
          className=" absolute left-0 top-0 block h-full  w-full object-cover brightness-[.75] "
          src={currentImage[currentCategory!] || "/men-bg.jpg"}
          alt=""
        />
      </header>
      <section className="grid grid-cols-product_container gap-x-8 gap-y-10 bg-gray-100 px-4 pb-6 pt-12">
        {products.map((product) => {
          if (product.category.toLowerCase() === currentCategory) {
            return <ProductCard key={product.id} {...product} />;
          } else if (currentCategory === undefined) {
            return <ProductCard key={product.id} {...product} />;
          }
        })}
      </section>
    </Fragment>
  );
}
export default Home;
