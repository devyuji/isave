import { NextPage } from "next";

import Error from "../components/modal/error";

const Custom500: NextPage = () => {
  return <Error handleClose={() => null} redirectTo="/" />;
};

export default Custom500;
