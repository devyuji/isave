import { redirect } from "next/navigation";

function isUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const urlParam = searchParams.get("url");

  if (!urlParam) redirect("/");

  if (!isUrl(urlParam)) {
    redirect("/");
  }

  const res = await fetch(urlParam);

  const raw = res.body;

  return new Response(raw, {
    headers: {
      "Content-Type": res.headers.get("content-type")!,
    },
  });
}
