import { FC } from "react";

import Error from "../components/modal/error";

const Custom500: FC = () => {
  return <Error handleClose={() => null} redirectTo="/" />;
};

export default Custom500;
