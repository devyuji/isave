import Link from "next/link";
import Container from "../components/container";
import Image from "../components/image";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto grid place-items-center h-20">
      <Container className="p-4 bg-zinc-100 grid gap-4 border-t-2 border-black h-full">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Image src="/images/logo.svg" alt="logo" className="w-6 h-6" />
            <p>isave - {year}</p>
          </div>

          <div className="flex gap-4 items-center text-sm">
            <Link href="/web/api">API</Link>
            <Link href="/privacy-policy">Privacy policy</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
