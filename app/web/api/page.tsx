import Container from "../../../components/container";
import Section from "./section";

export const metadata = {
  title: "Api for developer - isave",
  description:
    "isave api is available for other people to use if they needed in their project.",
};

function ApiPage() {
  return (
    <main className="grid place-items-center p-4">
      <Container>
        <p className="text-center leading-7">
          If you are interested in using our API, I would be happy to discuss
          the details with you. Please send us an email with the subject &quot;I
          want to use isave api&quot; and include information about your monthly
          server request average. This will allow us to better understand your
          needs and determine if our API is the right fit for your project. We
          look forward to hearing from you and hope that we can work together to
          achieve your goals.
        </p>

        <Section />
      </Container>
    </main>
  );
}

export default ApiPage;
