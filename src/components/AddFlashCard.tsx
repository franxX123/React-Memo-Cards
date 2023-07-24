import { useState } from "react";
import Button from "./Button";
import { addCard } from "../deckSlice/deckSlice";
import { useAppDispatch } from "../hooks";

const AddFlashCard: React.FC<{ closeCardHandler: () => void }> = ({
  closeCardHandler,
}) => {
  const [questionValue, setQuestionValue] = useState<string>("");
  const [answerValue, setAnswerValue] = useState<string>("");
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-center font-semibold text-green-400 text-center w-[500px] h-[350px] border border-slate-200 rounded-md shadow-md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col justify-between gap-5 items-center pt-8 pb-6"
      >
        <div className="w-[450px] space-y-3">
          <div className="space-y-2">
            <h3 className="text-left text-black">Front</h3>
            <textarea
              className="bg-cyan-500 w-full py-1 px-3 rounded-sm"
              value={questionValue}
              onChange={(e) => {
                setQuestionValue(e.target.value);
              }}
              disabled={false}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-left text-black">Back</h3>
            <textarea
              className="bg-sky-500 w-full py-1 px-3 rounded-sm"
              value={answerValue}
              onChange={(e) => {
                setAnswerValue(e.target.value);
              }}
              disabled={false}
            />
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex justify-between gap-2 w-full">
            <Button
              type="submit"
              text={"Add"}
              clickHandler={() => {
                dispatch(
                  addCard({
                    isReviewed: false,
                    cardId: Math.random().toString(),
                    question: questionValue,
                    answer: answerValue,
                  })
                );
                setQuestionValue("");
                setAnswerValue("");
              }}
            />

            <Button
              text={"Close"}
              clickHandler={() => {
                closeCardHandler();
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFlashCard;
