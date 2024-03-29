import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const data = await prisma.bids.delete({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
