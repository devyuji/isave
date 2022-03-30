// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";

type Response = {
  website: string;
  jwt: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const PRIVATE_KEY: string = process.env.PRIVATE_KEY!;
  console.log(Buffer.from(PRIVATE_KEY));

  const jwt = await new jose.SignJWT({ message: "isave" })
    .setProtectedHeader({ alg: "ES256" })
    .setExpirationTime("30sec")
    .setIssuedAt()
    .sign(Buffer.from(PRIVATE_KEY));

  return res.status(200).json({ website: "https://isave.cc", jwt });
};

export default handler;
