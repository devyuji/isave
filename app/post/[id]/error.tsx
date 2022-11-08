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
    <div>
      <p>Something went wrong!</p>
      <button onClick={() => reset()}>Reset error boundary</button>
    </div>
  );
}

export default Error;
