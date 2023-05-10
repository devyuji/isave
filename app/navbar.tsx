"use client";

import Link from "next/link";
import Container from "../components/container";

function Navbar() {
  return (
    <header className="h-20 flex justify-center sticky top-0 z-10 bg-white/30 backdrop-blur-sm">
      <Container className="p-4 flex justify-between items-center  rounded-b-3xl h-full ">
        <Link href="/" className="font-semibold text-3xl">
          isave
        </Link>

        <nav>
          <ul className="flex gap-2 items-center">
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
                Github
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
