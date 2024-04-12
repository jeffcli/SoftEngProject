import prisma from "../bin/database-connection.ts";
import express, { Router, Request, Response } from "express";
//import { Prisma } from "database";

//import {flower_requests} from "../../../../packages/database/prisma/client";

const router: Router = express.Router();

router.get("/", async function (req: Request, res: Response) {
  try {
    // Fetch the PatientName and PatientRoom from Prisma
    const serviceRequests = await prisma.serviceRequest.findMany({
      select: {
        requestID: true,
        name: true,
        priority: true,
        location: true,
        requestType: true,
        status: true,
      },
    });
    // No flower requests exist in the database
    if (serviceRequests.length === 0) {
      console.error("No flower requests have been made!");
      res.sendStatus(204); // Send 204 status if there is no data
    } else {
      console.log("Service requests:", serviceRequests); // Log retrieved data
      res.status(200).json(serviceRequests); // Send JSON response with data
    }
  } catch (error) {
    console.error("Error fetching service requests:", error);
    res.status(500).send("Internal Server Error"); // Send 500 status with error message
  }
});
// router.patch("/:orderNumber", (req, res) => {
//   res.send("PATCH route is working");
// });

router.patch("/:orderNumber", async (req: Request, res: Response) => {
  const { requestID } = req.params;
  const { status } = req.body;

  try {
    const updatedMedicineRequest = await prisma.serviceRequest.update({
      where: {
        requestID: parseInt(requestID),
      },
      data: {
        status: status,
      },
    });

    res.json(updatedMedicineRequest); // Send the updated flower request object back to the client
  } catch (error) {
    console.error(`Error updating flower request status: ${error}`);
    res.sendStatus(500);
  }
});

export default router;