import dbConnect from "../../../utils/dbConnect";
import { addDropType, getDropTypes } from "../../../utils/controller";

const handler = async (req: any, res: any): Promise<void> => {
  try {
    await dbConnect();
  } catch (err: any) {
    res.json({ success: false, data: err.message });
  }

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const dropTypes = await getDropTypes(req, res);
        return dropTypes;
      } catch (err: any) {
        res.json({ success: false, data: err.message });
      }
      break;

    case "POST":
      try {
        const dropType = await addDropType(req, res);
        return dropType;
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
