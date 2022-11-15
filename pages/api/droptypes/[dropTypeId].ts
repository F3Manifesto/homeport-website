import dbConnect from "../../../utils/dbConnect";
import {
  deleteDropType,
  getDropType,
  updateDropType,
} from "../../../utils/controllers";

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
        const dropTypes = await getDropType(req, res);
        return dropTypes
      } catch (err: any) {
        res.json({ success: false, data: err.message });
      }
      break;

    case "PUT":
      try {
        const dropType = await updateDropType(req, res);
        return dropType
      } catch (err: any) {
        res.json({ success: false, data: err.message });
      }
      break;

    case "DELETE":
      try {
        const dropType = await deleteDropType(req, res);
        return dropType
      } catch (err: any) {
        res.json({ success: false, data: err.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method}`);
      break;
  }
};

export default handler;
