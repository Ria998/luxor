import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const data = await prisma.collections.update({
        where: {
          id: Number(id),
        },
        data: req.body,
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.bids.deleteMany({
        where: {
          collection_id: Number(id),
        },
      });

      const data = await prisma.collections.delete({
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
