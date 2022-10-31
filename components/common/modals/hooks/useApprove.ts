import { useState } from "react";
import { useContractWrite } from "wagmi";
import { usePrepareContractWrite } from "wagmi";
import { useApproveResults } from "../../../../types/general.types";

const useApprove = (): useApproveResults => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [args, setArgs] = useState<any[]>();
  const { config } = usePrepareContractWrite({
    address: "0x850A7c6fE2CF48eea1393554C8A3bA23f20CC401",
    chainId: 1,
    abi: [
      {
        name: "setApprovalForModule",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          { internalType: "address", name: "_module", type: "address" },
          { internalType: "bool", name: "_approved", type: "bool" },
        ],

        outputs: [],
      },
    ],
    functionName: "setApprovalForModule",
    onError(error: any) {
      console.error("Error", error);
    },
    enabled: Boolean(enabled),
    args: args,
  });

  const { writeAsync } = useContractWrite(config);

  const prepareApproval = (): void => {
    setEnabled(true);
    const contractArgs: any[] = [
      "0x6170B3C3A54C3d8c854934cBC314eD479b2B29A3",
      true,
    ];
    setArgs(contractArgs);
  };

  const approveAddress = async (): Promise<void> => {
    try {
      const tx: any = await writeAsync?.();
      const res: any = await tx?.wait();
    } catch (err: any) {
      console.error(err);
    }
    setEnabled(false);
  };

  return { prepareApproval, approveAddress };
};

export default useApprove;
