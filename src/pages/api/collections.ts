import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.collections.findMany<{}>({
        include: {
          bids: true,
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}
