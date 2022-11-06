import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch }) => {
  try {
    const res = await fetch(`/post/${params.id}`);

    return res.json();
  } catch (err) {
    console.log(err);
    throw error(500, "Something went wrong");
  }
};
