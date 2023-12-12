"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { UPDATE_TOKEN } from "../redux/reducer/token";

const maxTokens = 3;
const refillRateMs = 60000;
const refillAmount = 1;

const useTokenBucket = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token.tokenAvailable);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const refill = () => {
      dispatch(UPDATE_TOKEN(Math.min(token + refillAmount, maxTokens)));
    };

    // Refill the token bucket at the specified rate
    timer = setInterval(refill, refillRateMs);

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [dispatch, token]);

  const consumeToken = () => {
    if (token > 0) {
      dispatch(UPDATE_TOKEN(token - 1));
      return true;
    }
    return false;
  };

  return consumeToken;
};

export default useTokenBucket;
