import Container from "../../../components/container";
import Section from "./section";

interface Props {
  params: { id: string };
}

export type Data = {
  download_url: string;
  preview: string;
  type: string;
};

export type DataProps = {
  data: Data[];
  username: string;
};

async function getData(id: string) {
  const url = process.env.API_URL!;

  const config = {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.KEY!,
    },
    next: {
      revalidate: 3600,
    },
  };

  const res = await fetch(url, config);

  if (res.status != 200) {
    throw new Error("server-error");
  }

  return res.json();
}

async function MediaPage({ params }: Props) {
  const data: DataProps = await getData(params.id);

  return (
    <main className="flex justify-center">
      <Container>
        <Section data={data} id={params.id} />
      </Container>
    </main>
  );
}

export default MediaPage;
