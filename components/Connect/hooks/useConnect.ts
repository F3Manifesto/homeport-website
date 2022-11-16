import { useRouter } from "next/router";
import { useState } from "react";
import { FormEvent } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { addUser, getUsers } from "../../../lib/helpers";
import { setUser } from "../../../redux/reducers/userSlice";
import { UseConnectResult, UserInterface } from "../../../types/general.types";
import lodash from "lodash";

const useConnect = (): UseConnectResult => {
  const { data } = useQuery("users", getUsers);
  const dispatch = useDispatch();
  const router = useRouter();
  const [success, setSuccess] = useState<boolean>(false);
  const [foundUser, setFoundUser] = useState<boolean>(true);
  const addMutation = useMutation(addUser, {
    onSuccess: async () => {
      setSuccess(true);
    },
  });
  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    const userDataType: UserInterface = {
      username: (e.target as HTMLFormElement).username.value,
      password: (e.target as HTMLFormElement).password.value,
    };
    addMutation.mutate(userDataType);
    (e.target as HTMLFormElement).reset();
  };

  const handleLogIn = (e: FormEvent) => {
    e.preventDefault();
    const newData = lodash.filter(
      data,
      (item) =>
        item.password === (e.target as HTMLFormElement).password.value &&
        item.username === (e.target as HTMLFormElement).username.value
    );
    if (newData?.length !== 0) {
      dispatch(
        setUser({
          actionValue: true,
          actionId: newData[0]._id,
        })
      );
      router.push("/dashboard");
    } else {
      setFoundUser(false);
    }
  };

  return { handleSignUp, success, handleLogIn, foundUser, setFoundUser };
};

export default useConnect;
