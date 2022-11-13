import dbConnect from "../../../utils/dbConnect";
import {
  deleteDropType,
  getDropTypes,
  updateDropType,
} from "../../../utils/controller";

const handler = async (req: any, res: any): Promise<void> => {
  try {
    await dbConnect();
  } catch (err: any) {
    console.error(err.message);
  }

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const dropTypes = await getDropTypes(req, res);
        res.status(200).json({ success: true, data: dropTypes });
      } catch (err: any) {
        res.status(400).json({ success: false, data: err.message });
      }
      break;

    case "PUT":
      try {
        const dropType = await updateDropType(req, res);
        res.status(201).json({ success: true, data: dropType });
      } catch (err: any) {
        res.status(400).json({ success: false, data: err.message });
      }
      break;

    case "DELETE":
      try {
        const dropType = await deleteDropType(req, res);
        res.status(201).json({ success: true, data: dropType });
      } catch (err: any) {
        res.status(400).json({ success: false, data: err.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method}`);
      break;
  }
};

export default handler;
