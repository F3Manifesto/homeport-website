import { useRouter } from "next/router";
import { useState } from "react";
import { FormEvent } from "react";
import { useMutation, useQuery } from "react-query";
import { addUser, getUsers } from "../../../lib/helpers";
import { UseConnectResult, UserInterface } from "../../../types/general.types";

const useConnect = (): UseConnectResult => {
  const { data } = useQuery("users", getUsers);
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
    const newData = data?.filter(
      (user: any) =>
        user.username === (e.target as HTMLFormElement).username.value &&
        user.password === (e.target as HTMLFormElement).password.value
    );
    if (newData?.length !== 0) {
      router.push("/dashboard");
    } else {
      setFoundUser(false);
    }
  };

  return { handleSignUp, success, handleLogIn, foundUser, setFoundUser };
};

export default useConnect;
