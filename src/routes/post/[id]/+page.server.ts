import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { API_URL, USER_AGENT } from "$env/static/private";

export const load: PageServerLoad = async ({ params }) => {
  try {
    const url = `${API_URL}/post`;

    const config: RequestInit = {
      method: "post",
      body: JSON.stringify({ id: params.id }),
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

    return res.json();
  } catch (err) {
    console.log(err);
    throw error(500, "Something went wrong");
  }
};
