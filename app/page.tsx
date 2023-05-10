import Container from "../components/container";
import Features from "./feature";
import Intro from "./intro";

function HomePage() {
  return (
    <main className="h-full grid place-items-center">
      <Container className="p-4">
        <Intro />
        <Features />
      </Container>
    </main>
  );
}

export default HomePage;
