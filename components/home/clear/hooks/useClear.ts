import { useState } from "react";
import { useClearResults } from "../../../../types/general.types";

const useClear = (): useClearResults => {
  const messages: string[] = [
    "Did you think I wouldn't notice?",
    "Feeling better now?",
  ];

  const [message, setMessage] = useState<string>(messages[0]);
  const size: number = messages.length;

  const random: number = Math.floor(size * Math.random());

  const randomMessage = (): void => {
    setMessage(messages[random]);
  };

  return { randomMessage, message };
};

export default useClear;
