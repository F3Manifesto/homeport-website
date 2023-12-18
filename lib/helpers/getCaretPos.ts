import { FormEvent, RefObject } from "react";
import getCaretCoordinates from "textarea-caret";

const getCaretPos = (
  e: FormEvent<HTMLTextAreaElement>,
  textElement: RefObject<HTMLTextAreaElement>
): { x: number; y: number } => {
  const caret = getCaretCoordinates(
    e.target as HTMLElement,
    (e.target as HTMLTextAreaElement).selectionEnd
  );
  return {
    x:
      caret.left > (2 / 3) * (textElement.current?.clientWidth as number)
        ? caret.left - 150
        : caret.left,
    y:
      (textElement.current?.scrollHeight as number) >
      (textElement.current?.clientHeight as number)
        ? -30
        : caret.top,
  };
};

export default getCaretPos;
