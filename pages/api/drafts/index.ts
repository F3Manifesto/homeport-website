import dbConnect from "../../../utils/dbConnect";
import { addDraft, getDrafts } from "../../../utils/controllers";

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
        const drafts = await getDrafts(req, res);
        return drafts;
      } catch (err: any) {
        res.json({ success: false, data: err.message });
      }
      break;

    case "POST":
      try {
        const draft = await addDraft(req, res);
        return draft;
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
