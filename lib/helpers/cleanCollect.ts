import { OpenActionModuleInput } from "../../graphql/generated";
const cleanCollect = (
  openActionModules: OpenActionModuleInput[]
): OpenActionModuleInput[] => {
  if (openActionModules && openActionModules.length > 0) {
    const firstModule = openActionModules[0];

    if (
      !firstModule.collectOpenAction?.simpleCollectOpenAction?.hasOwnProperty(
        "followerOnly"
      )
    ) {
      const newSimpleCollectOpenAction = {
        ...firstModule.collectOpenAction?.simpleCollectOpenAction,
        followerOnly: false,
      };
      firstModule.collectOpenAction!.simpleCollectOpenAction =
        newSimpleCollectOpenAction;
    }

    let simpleCollect = firstModule.collectOpenAction?.simpleCollectOpenAction;
    if (simpleCollect && simpleCollect.hasOwnProperty("amount")) {
      const amount = simpleCollect.amount;
      if (
        !amount?.value ||
        !amount?.currency ||
        parseFloat(amount?.value || "") <= 0
      ) {
        const { amount, ...restOfSimpleCollect } = simpleCollect;
        simpleCollect = restOfSimpleCollect;
      }
    }
    if (firstModule.collectOpenAction) {
      firstModule.collectOpenAction.simpleCollectOpenAction = simpleCollect;
    }

    openActionModules[0] = firstModule;
  }

  return openActionModules;
};

export default cleanCollect;
