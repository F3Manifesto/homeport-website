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

    if (
      firstModule.collectOpenAction?.simpleCollectOpenAction?.hasOwnProperty(
        "amount"
      ) &&
      (!firstModule.collectOpenAction.simpleCollectOpenAction.amount?.hasOwnProperty(
        "value"
      ) ||
        !firstModule.collectOpenAction?.simpleCollectOpenAction?.amount?.hasOwnProperty(
          "currency"
        )) &&
      parseFloat(
        firstModule.collectOpenAction?.simpleCollectOpenAction?.amount?.value ||
          ""
      ) <= 0
    ) {
      delete firstModule.collectOpenAction?.simpleCollectOpenAction?.amount;
    }

    openActionModules[0] = firstModule;
  }

  return openActionModules;
};

export default cleanCollect;
