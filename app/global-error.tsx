"use client";

import Container from "../components/container";
import Footer from "./footer";
import Navbar from "./navbar";

interface Props {
  error: Error;
  reset: () => void;
}

function GlobalError({ reset }: Props) {
  return (
    <html>
      <body>
        <Navbar />
        <main className="grid place-items-center">
          <Container className="p-4 grid gap-4 text-center">
            <h2 className="text-2xl font-bold text-red-500">
              Something went wrong!
            </h2>
            <p className="text-lg font-medium text-gray-600">
              Please retry in a few seconds. {"We'll"} be back up and running in
              no time. If the problem persists, please report it to a developer
              on GitHub.
            </p>

            <div className="grid place-items-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-black p-2 rounded-lg text-white"
              >
                Try again
              </button>
            </div>
          </Container>
        </main>

        <Footer />
      </body>
    </html>
  );
}

export default GlobalError;
