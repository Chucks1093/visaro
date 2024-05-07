import {
  UNSAFE_ErrorResponseImpl as ErrorResponseImpl,
  useRouteError,
} from "react-router-dom";

import NavBar from "../components/NavBar";

function Error() {
  const error = useRouteError() as ErrorResponseImpl;

  return (
    <div>
      <NavBar />
      <h1 className="flex h-[30rem] items-center justify-center bg-gray-300 font-jersey text-5xl md:text-7xl text-center">
        {error.status} - {error.statusText}
      </h1>
      <div className="mt-4 justify-between gap-7 px-4 pb-7  md:flex md:px-12">
        <p className="mx-auto">{error.data}</p>
      </div>
    </div>
  );
}
export default Error;
