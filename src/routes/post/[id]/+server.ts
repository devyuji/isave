import { API_URL, USER_AGENT } from "$env/static/private";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
  const id = params.id;

  const url = `${API_URL}/post`;

  const config: RequestInit = {
    method: "post",
    body: JSON.stringify({ id }),
    headers: {
      "User-agent": USER_AGENT,
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  };

  const res = await fetch(url, config);

  console.log(res.status);

  if (res.status != 200) {
    throw error(res.status, "something went wrong");
  }

  const data = await res.json();

  return json(data);
};
