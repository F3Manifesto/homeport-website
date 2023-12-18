import { AnyAction, Dispatch } from "redux";
import { setLensConnected } from "../../redux/reducers/lensConnectedSlice";
import getProfile from "../../graphql/lens/queries/profile";
import { Profile } from "../../graphql/generated";

const refetchProfile = async (
  dispatch: Dispatch<AnyAction>,
  id: string,
  connected: boolean
) => {
  try {
    const { data } = await getProfile(
      {
        forProfileId: id,
      },
      connected
    );

    dispatch(setLensConnected(data?.profile as Profile));
  } catch (err: any) {
    console.error(err.message);
  }
};

export default refetchProfile;
