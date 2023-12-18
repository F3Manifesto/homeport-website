import { ChangeEvent, RefObject, SetStateAction } from "react";
import searchProfiles from "../../graphql/lens/queries/searchProfiles";
import { Profile, LimitType } from "../../graphql/generated";
import getCaretPos from "./getCaretPos";

const handleSearchProfiles = async (
  e: ChangeEvent<HTMLTextAreaElement>,
  setProfilesOpen: (e: SetStateAction<boolean[]>) => void,
  setMentionProfiles: (e: SetStateAction<Profile[]>) => void,
  index: number,
  lensConnected: Profile | undefined,
  setCaretCoord: (e: SetStateAction<{ x: number; y: number }>) => void,
  textElement: RefObject<HTMLTextAreaElement>
): Promise<void> => {
  try {
    if (
      e.target.value.split(" ")[e.target.value.split(" ")?.length - 1][0] ===
        "@" &&
      e.target.value.split(" ")[e.target.value.split(" ")?.length - 1]
        ?.length === 1
    ) {
      setProfilesOpen((prev) => {
        const arr = [...prev];
        arr[index] = true;
        return arr;
      });
      setCaretCoord(getCaretPos(e, textElement));
    }
    if (
      e.target.value.split(" ")[e.target.value.split(" ")?.length - 1][0] ===
      "@"
    ) {
      const allProfiles = await searchProfiles(
        {
          query:
            e.target.value.split(" ")[e.target.value.split(" ")?.length - 1],
          limit: LimitType.TwentyFive,
        },
        lensConnected?.id
      );
      setMentionProfiles(allProfiles?.data?.searchProfiles?.items as Profile[]);
    } else {
      setProfilesOpen((prev) => {
        const arr = [...prev];
        arr[index] = false;
        return arr;
      });
      setMentionProfiles([]);
    }
  } catch (err: any) {
    console.error(err.message);
  }
};

export default handleSearchProfiles;
