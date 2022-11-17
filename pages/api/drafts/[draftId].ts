import dbConnect from "../../../utils/dbConnect";
import { deleteDraft, updateDraft, getDraft } from "../../../utils/controllers";

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
        const draft = await getDraft(req, res);
        return draft;
      } catch (err: any) {
        res.json({ success: false, data: err.message });
      }
      break;

    case "PUT":
      try {
        const draft = await updateDraft(req, res);
        return draft;
      } catch (err: any) {
        res.json({ success: false, data: err.message });
      }
      break;

    case "DELETE":
      try {
        const draft = await deleteDraft(req, res);
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
