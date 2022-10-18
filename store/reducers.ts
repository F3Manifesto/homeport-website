export const orderObject = (state: any = null, action: any) => {
  switch (action.type) {
    case "ORDER_SELECTED":
      return {
        order: action.order,
      };

    default:
      return state;
  }
};
