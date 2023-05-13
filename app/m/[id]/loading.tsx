import Container from "../../../components/container";
import Spinner from "../../../components/spinner";

function Loading() {
  return (
    <main className="grid place-items-center">
      <Container className="p-4 flex items-center justify-center gap-2">
        <Spinner />
        <p>Loading...</p>
      </Container>
    </main>
  );
}

export default Loading;
