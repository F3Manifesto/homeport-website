import { AnyAction, Dispatch } from "redux";
import { Post } from "../../graphql/generated";
import { setFollowCollect } from "../../redux/reducers/followCollectSlice";

const collectLogic = (
  pub: Post,
  disabled: boolean | undefined,
  loader: boolean,
  dispatch: Dispatch<AnyAction>,
  main: boolean,
  quote: boolean,
  simpleCollect:
    | ((
        id: string,
        type: string,
        main: boolean,
        quote: boolean
      ) => Promise<void>)
    | undefined
): void => {
  if (
    disabled ||
    loader ||
    (pub?.openActionModules?.[0]?.__typename !==
      "SimpleCollectOpenActionSettings" &&
      pub?.openActionModules?.[0]?.__typename !==
        "MultirecipientFeeCollectOpenActionSettings") ||
    !simpleCollect
  )
    return;

  Number(pub?.openActionModules?.[0]?.amount?.value) > 0 ||
  pub?.openActionModules?.[0]?.endsAt != null ||
  Number(pub.openActionModules?.[0]?.collectLimit) > 0 ||
  pub?.openActionModules?.[0]?.followerOnly
    ? dispatch(
        setFollowCollect({
          actionType: "collect",
          actionCollect: {
            id: pub?.id,
            stats: pub.stats.countOpenActions,
            item: pub?.openActionModules?.[0],
          },
          actionFollower: pub?.by,
        })
      )
    : (
        simpleCollect! as (
          id: string,
          type: string,
          main: boolean,
          quote: boolean
        ) => Promise<void>
      )(pub?.id, pub?.openActionModules?.[0]?.__typename, main, quote);
};

export default collectLogic;
