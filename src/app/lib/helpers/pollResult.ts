import { PublicClient, SessionClient } from "@lens-protocol/client";
import { transactionStatus } from "@lens-protocol/client/actions";

const pollResult = async (
  txHash: string,
  client: SessionClient | PublicClient
): Promise<boolean> => {
  const MAX_RETRIES = 20;
  let retries = 0;

  try {
    while (retries < MAX_RETRIES) {
      const res = await transactionStatus(client, {
        txHash,
      });

      if (res.isOk()) {

        switch (res.value.__typename) {
          case "FinishedTransactionStatus":
            return true;
          case "FailedTransactionStatus":
            return false;
          default:
            await new Promise((resolve) => setTimeout(resolve, 5000));
            retries++;
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        retries++;
      }
    }

    console.warn(`Transaction polling timed out for txHash: ${txHash}`);
    return false;
  } catch (err: any) {
    console.error(`Error processing txHash: ${txHash}, attempt ${retries}`);
    console.error(err.message);
    return false;
  }
};

export default pollResult;
