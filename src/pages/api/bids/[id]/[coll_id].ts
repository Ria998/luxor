import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, coll_id } = req.query;

  if (req.method === "PATCH") {
    try {
      if (req.body.status === "Accepted") {
        const dataReject = { ...req.body };
        dataReject.status = "Rejected";

        await prisma.bids.updateMany({
          where: {
            collection_id: Number(coll_id),
          },
          data: dataReject,
        });
      }

      const data = await prisma.bids.update({
        where: {
          id: Number(id),
        },
        data: req.body,
      });

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}
