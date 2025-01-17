import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await prisma.collections.findMany<{}>({
        orderBy: [
          {
            id: "desc",
          },
        ],
        include: {
          bids: {
            orderBy: {
              status: "asc",
            },
          },
        },
      });
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    try {
      const data = await prisma.collections.create({
        data: req.body,
      });
      return res.status(201).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
