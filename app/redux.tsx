"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

interface Props {
  children: ReactNode;
}

function ReduxInit({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxInit;
