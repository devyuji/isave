"use client";

import Link from "next/link";

import Container from "../components/container";
import { useEffect, useRef, useState } from "react";

function Navbar() {
  const [showInstallOption, setInstallOption] = useState(false);

  let deferredPrompt = useRef<any>();

  useEffect(() => {
    const beforeInstallPrompt = (e: any) => {
      e.preventDefault();
      deferredPrompt.current = e;

      setInstallOption(true);
    };

    window.addEventListener("beforeinstallprompt", beforeInstallPrompt);

    return () =>
      window.removeEventListener("beforeinstallprompt", beforeInstallPrompt);
  }, []);

  const installApp = () => {
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt();
    }
  };

  return (
    <header className="h-20 flex justify-center sticky top-0 z-10 bg-white/30 backdrop-blur-sm">
      <Container className="p-4 flex justify-between items-center  rounded-b-3xl h-full ">
        <Link href="/" className="font-semibold text-3xl">
          isave
        </Link>

        <nav>
          <ul className="flex gap-2 items-center text-sm">
            {showInstallOption && (
              <li className="p-2 rounded-full">
                <button
                  onClick={installApp}
                  type="button"
                  className="hover:border-black border-b-2 border-transparent flex items-center gap-2"
                >
                  <span>
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </span>
                  <span className="hidden md:inline">Install app</span>
                </button>
              </li>
            )}

            <li className="p-2 rounded-full">
              <Link
                href="/how-to-get-url"
                className="hover:border-black border-b-2 border-transparent"
              >
                How to get url?
              </Link>
            </li>

            <li className="p-2 rounded-full">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/devyuji/isave"
                className="flex gap-1 items-center hover:border-black border-b-2 border-transparent"
              >
                <span className="hidden md:inline">Github</span>
                <span className="inline md:hidden">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </span>
                <span>
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;
