import { useNavigate, useSearchParams } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutReceipt from "../components/CheckoutReceipt";

type Status = "paid" | "pending" | null;

function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const status = searchParams.get("status") as Status;
  const ref = searchParams.get("ref") as string | null;

  return (
    <div>
      <div className="flex h-[30rem] flex-col items-center justify-center bg-gray-300 font-jersey text-5xl md:text-7xl">
        {status === "paid" ? (
          <div>
            <h1 className="text-center">Thank you for your purchase!</h1>
            {ref && (
              <>
                <p className="mt-6 text-center font-sans text-base">
                  Your payment has been received! Your transaction reference is
                  "{ref}"
                </p>
                <p className="mt-6 text-center font-sans text-base">
                  Check your email for more information.
                </p>
              </>
            )}
          </div>
        ) : (
          <h1>Checkout</h1>
        )}
      </div>

      <div className="mt-4 justify-between gap-7 px-4 pb-7 md:flex md:px-12">
        {status === "paid" ? (
          <div className="mx-auto mt-6 flex w-full max-w-md flex-col items-center gap-2 font-sans text-base font-bold lg:flex-row">
            {/* <button className="w-full rounded border-2 border-blue-500 bg-blue-500 py-3 text-center font-bold text-white">
              Download Receipt
            </button> */}

            <button
              onClick={() => navigate("/", { replace: true })}
              type="button"
              className="w-full rounded border-2 border-blue-500 py-3 text-center font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className=" md:w-[74%] ">
              <CheckoutForm />
            </div>
            <CheckoutReceipt />
          </>
        )}
      </div>
    </div>
  );
}
export default Checkout;
