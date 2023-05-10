"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function ReduxInit({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxInit;
