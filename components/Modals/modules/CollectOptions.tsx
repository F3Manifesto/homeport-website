import { FunctionComponent } from "react";
import { setPostCollect } from "../../../redux/reducers/postCollectSlice";
import { CollectOptionsProps } from "../types/modals.types";

const CollectOptions: FunctionComponent<CollectOptionsProps> = ({
  openMeasure,
  setOpenMeasure,
  availableCurrencies,
  collectTypes,
  id,
  dispatch,
  t,
}): JSX.Element => {
  return (
    <div
      className={`relative rounded-md flex gap-5 w-full items-center justify-center h-full cursor-empireS`}
    >
      <div className="relative w-full h-full flex flex-col flex-wrap justify-start items-center gap-3 break-words p-3">
        <div className="relative h-full w-full flex flex-wrap gap-4 items-start justify-center">
          {[
            {
              type: "drop",
              title: t("who"),
              dropValues: [t("ev"), t("fol")],
              dropOpen: openMeasure.whoCollectsOpen,
              chosenValue: collectTypes?.[id]?.followerOnly
                ? t("fol")
                : t("ev"),
              showObject: true,
              openDropdown: () =>
                setOpenMeasure((prev) => ({
                  ...prev,
                  whoCollectsOpen: !prev.whoCollectsOpen,
                })),
              setValue: (item: string) => {
                const newCTs =
                  typeof collectTypes === "object" ? { ...collectTypes } : {};

                newCTs[id] =
                  openMeasure?.award == t("no")
                    ? {
                        followerOnly: item === t("fol") ? true : false,
                      }
                    : {
                        ...(newCTs[id] || {}),
                        followerOnly: item === t("fol") ? true : false,
                      };

                dispatch(
                  setPostCollect({
                    actionId: id,
                    actionCollectTypes: newCTs,
                  })
                );
              },
            },
            {
              type: "drop",
              title: t("award"),
              dropValues: [t("yes"), t("no")],
              dropOpen: openMeasure.creatorAwardOpen,
              chosenValue: openMeasure.award,
              showObject: true,
              openDropdown: () =>
                setOpenMeasure((prev) => ({
                  ...prev,
                  creatorAwardOpen: !prev.creatorAwardOpen,
                })),
              setValue: (item: string) => {
                setOpenMeasure((prev) => ({
                  ...prev,
                  award: item,
                }));

                const newCTs =
                  typeof collectTypes === "object" ? { ...collectTypes } : {};

                newCTs[id] =
                  openMeasure?.award == t("no")
                    ? {
                        followerOnly: item === t("fol") ? true : false,
                      }
                    : ({
                        ...(newCTs[id] || {}),
                      } as any);

                dispatch(
                  setPostCollect({
                    actionId: id,
                    actionCollectTypes: newCTs,
                  })
                );
              },
            },
            {
              type: "input",
              title: t("amount"),
              chosenValue: collectTypes?.[id]?.amount?.value || "0",
              showObject: openMeasure.award === t("yes") ? true : false,
              setValue: (item: string) => {
                const newCTs =
                  typeof collectTypes === "object" ? { ...collectTypes } : {};

                newCTs[id] = {
                  ...(newCTs[id] || {}),
                  amount: {
                    ...(newCTs[id]?.amount || {}),
                    value: item,
                    currency:
                      availableCurrencies?.find((value) => {
                        if (
                          value.contract.address ===
                          collectTypes?.[id!]?.amount?.currency
                        ) {
                          return value;
                        }
                      })?.contract?.address! ||
                      availableCurrencies?.[0]?.contract?.address,
                  },
                } as any;

                dispatch(
                  setPostCollect({
                    actionId: id,
                    actionCollectTypes: newCTs,
                  })
                );
              },
            },
            {
              type: "drop",
              title: t("curr"),
              dropValues: availableCurrencies?.map((item) => item.symbol),
              chosenValue:
                availableCurrencies?.find((item) => {
                  if (
                    item.contract.address ===
                    collectTypes?.[id]?.amount?.currency
                  ) {
                    return item;
                  }
                })?.symbol! || availableCurrencies?.[0]?.symbol,
              dropOpen: openMeasure.currencyOpen,
              showObject: openMeasure.award === t("yes") ? true : false,
              openDropdown: () =>
                setOpenMeasure((prev) => ({
                  ...prev,
                  currencyOpen: !prev.currencyOpen,
                })),
              setValue: (item: string) => {
                const newCTs =
                  typeof collectTypes === "object" ? { ...collectTypes } : {};
                newCTs[id] = newCTs[id] || {
                  followerOnly: false,
                };

                newCTs[id] = {
                  ...(newCTs[id] || {}),
                  amount: {
                    ...(newCTs[id]?.amount || {}),
                    currency: item,
                  },
                } as any;

                dispatch(
                  setPostCollect({
                    actionId: id,
                    actionCollectTypes: newCTs,
                  })
                );
              },
            },
            {
              type: "input",
              title: t("ref"),
              chosenValue: String(collectTypes?.[id]?.referralFee || "0"),
              showObject: openMeasure.award === t("yes") ? true : false,

              setValue: (item: string) => {
                const newCTs =
                  typeof collectTypes === "object" ? { ...collectTypes } : {};

                newCTs[id] = {
                  ...(newCTs[id] || {}),
                  referralFee: Number(item),
                } as any;

                dispatch(
                  setPostCollect({
                    actionId: id,
                    actionCollectTypes: newCTs,
                  })
                );
              },
            },
            {
              type: "drop",
              title: t("edit"),
              dropValues: [t("yes"), t("no")],
              dropOpen: openMeasure.editionOpen,
              chosenValue: openMeasure.edition,
              showObject: openMeasure.award === t("yes") ? true : false,
              openDropdown: () =>
                setOpenMeasure((prev) => ({
                  ...prev,
                  editionOpen: !prev.editionOpen,
                })),
              setValue: (item: string) => {
                setOpenMeasure((prev) => ({
                  ...prev,
                  edition: item,
                }));

                const newCTs =
                  typeof collectTypes === "object" ? { ...collectTypes } : {};

                newCTs[id] =
                  openMeasure?.edition == t("no")
                    ? {
                        ...(newCTs[id] || {}),
                        collectLimit: undefined,
                      }
                    : ({
                        ...(newCTs[id] || {}),
                      } as any);

                dispatch(
                  setPostCollect({
                    actionId: id,
                    actionCollectTypes: newCTs,
                  })
                );
              },
            },
            {
              type: "input",
              title: t("editam"),
              chosenValue: collectTypes?.[id]?.collectLimit || "0",
              showObject: openMeasure?.edition === t("yes") ? true : false,
              setValue: (item: string) => {
                const newCTs =
                  typeof collectTypes === "object" ? { ...collectTypes } : {};

                newCTs[id] =
                  openMeasure?.edition == t("no")
                    ? {
                        ...(newCTs[id] || {}),
                        collectLimit: undefined,
                      }
                    : ({
                        ...(newCTs[id] || {}),
                        collectLimit: item,
                      } as any);

                dispatch(
                  setPostCollect({
                    actionId: id,
                    actionCollectTypes: newCTs,
                  })
                );
              },
            },
            {
              type: "drop",
              title: t("24"),
              dropValues: [t("yes"), t("no")],
              dropOpen: openMeasure.timeOpen,
              chosenValue: openMeasure.time,
              showObject: openMeasure.award === t("yes") ? true : false,
              openDropdown: () =>
                setOpenMeasure((prev) => ({
                  ...prev,
                  timeOpen: !prev.timeOpen,
                })),
              setValue: (item: string) => {
                setOpenMeasure((prev) => ({
                  ...prev,
                  time: item,
                }));

                const newCTs =
                  typeof collectTypes === "object" ? { ...collectTypes } : {};

                if (item === t("yes")) {
                  newCTs[id] = {
                    ...(newCTs[id] || {}),
                    endsAt: new Date(
                      new Date().getTime() + 24 * 60 * 60 * 1000
                    ),
                  } as any;
                } else {
                  newCTs[id] = {
                    ...(newCTs[id] || {}),
                    endsAt: undefined,
                  } as any;
                }
                dispatch(
                  setPostCollect({
                    actionId: id,
                    actionCollectTypes: newCTs,
                  })
                );
              },
            },
          ].map(
            (
              item: {
                type: string;
                title: string;
                showObject: boolean;
                dropOpen?: boolean;
                chosenValue: string;
                dropValues?: string[];
                openDropdown?: () => void;
                setValue: (item: string) => void;
              },
              indexTwo: number
            ) => {
              return (
                item.showObject &&
                (item.type === "drop" ? (
                  <div
                    className="relative flex items-center justify-center flex-col w-48 h-fit pb-1.5 gap-2"
                    key={indexTwo}
                  >
                    <div className="relative w-full h-fit flex items-start justify-start font-din text-black text-sm">
                      {item?.title}
                    </div>
                    <div className="relative w-full h-12 p-px rounded-sm flex flex-row items-center justify-center font-din text-black text-center border border-black">
                      <div className="relative bg-lightYellow flex flex-row w-full h-full justify-start items-center rounded-sm p-2 gap-2">
                        <div
                          className={`relative flex items-center justify-center cursor-pointer w-4 h-3 ${
                            item.dropOpen && "-rotate-90"
                          }`}
                          onClick={() => item.openDropdown!()}
                        >
                          <div className="relative w-fit h-fit text-xl">#</div>
                        </div>
                        <div className="relative w-full h-full p-1.5 bg-lightYellow flex items-center justify-center">
                          {item.chosenValue}
                        </div>
                      </div>
                    </div>
                    {item.dropOpen && (
                      <div className="absolute flex items-start justify-center w-full h-fit max-height-[7rem] overflow-y-scroll z-50 bg-lightYellow top-20 p-px border border-black rounded-sm">
                        <div className="relative flex flex-col items-center justify-start w-full h-fit gap-px">
                          {item.dropValues?.map(
                            (value: string, indexThree: number) => {
                              return (
                                <div
                                  key={indexThree}
                                  className="relative w-full h-8 py-px bg-lightYellow items-center justify-center flex text-sol text-sm uppercase font-din hover:bg-grad2 hover:text-black cursor-pointer"
                                  onClick={() => {
                                    item.setValue(
                                      indexTwo === 4
                                        ? availableCurrencies[indexThree]
                                            .contract.address
                                        : value
                                    );
                                    item.openDropdown!();
                                  }}
                                >
                                  {value}
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="relative flex items-center justify-center flex-col w-48 h-fit pb-1.5 gap-2"
                    key={indexTwo}
                  >
                    <div className="relative w-full h-fit flex items-start justify-start font-din text-black text-sm">
                      {item?.title}
                    </div>
                    <div className="relative w-full h-12 p-px rounded-sm flex flex-row items-center justify-center font-din text-sol text-center">
                      <div
                        className={`relative flex items-center justify-center cursor-pointer w-4 h-3`}
                      >
                        <div className="relative w-fit h-fit text-xl">#</div>
                      </div>
                      <input
                        className="relative bg-lightYellow flex flex-row w-full h-full justify-start items-center rounded-sm p-2 gap-2"
                        onChange={(e) => item.setValue(e.target.value)}
                        value={item.chosenValue || ""}
                      />
                    </div>
                  </div>
                ))
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectOptions;
