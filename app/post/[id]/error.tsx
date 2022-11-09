"use client";

import { useEffect } from "react";

interface Props {
  error: Error;
  reset: () => void;
}

function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Something went wrong! 💀</h1>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Error;
