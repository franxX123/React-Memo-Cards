import React, { useEffect } from "react";
import Button from "./Button";
import { useState } from "react";
import { Card } from "../deckSlice/deckSlice";
import { useAppDispatch } from "../hooks";
import { reviewCard, updateCard } from "../deckSlice/deckSlice";

export enum FlashCardType {
  study = "study",
  edit = "edit",
}

const FlashCard: React.FC<{
  initCardType: FlashCardType;
  card: Card | undefined;
}> = ({ initCardType, card }) => {
  const [type, setType] = useState<FlashCardType>(initCardType);
  const [questionValue, setQuestionValue] = useState<string>(card!.question);
  const [answerValue, setAnswerValue] = useState<string>(card!.answer);
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setQuestionValue(card!.question);
    setAnswerValue(card!.answer);
  }, [card]);

  return (
    <>
      <div className="flex justify-center font-semibold text-green-400 text-center w-[500px] h-[350px] border border-slate-200 rounded-md shadow-md">
        <form className="flex flex-col justify-between gap-5 items-center pt-8 pb-6">
          <div className="w-[450px] space-y-3">
            <div className="space-y-2">
              <h3 className="text-left text-black">Front</h3>
              <textarea
                className="bg-cyan-500 w-full py-1 px-3 rounded-sm"
                value={questionValue}
                onChange={(e) => {
                  e.preventDefault();
                  setQuestionValue(e.target.value);
                }}
                disabled={disabled}
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-left text-black">Back</h3>
              <textarea
                className="bg-sky-500 w-full py-1 px-3 rounded-sm"
                value={isShowAnswer ? answerValue : ""}
                onChange={(e) => {
                  e.preventDefault();
                  setAnswerValue(e.target.value);
                }}
                disabled={disabled}
              />
            </div>
          </div>

          {type === FlashCardType.edit && (
            <div className="flex justify-center w-full">
              <Button
                clickHandler={() => {
                  setDisabled(true);
                  setIsShowAnswer(false);
                  setType(FlashCardType.study);

                  dispatch(
                    updateCard({
                      cardId: card!.cardId,
                      answer: answerValue,
                      question: questionValue,
                      isReviewed: card!.isReviewed,
                    })
                  );
                }}
                text={"Save"}
              />
            </div>
          )}

          {type === FlashCardType.study && (
            <div className="flex justify-between gap-2 w-full">
              <Button
                clickHandler={() => {
                  setType(FlashCardType.edit);
                  setIsShowAnswer(true);
                  setDisabled(false);
                }}
                text={"Edit"}
              />
              {isShowAnswer ? (
                <div className="flex gap-5">
                  <Button
                    text="Good"
                    clickHandler={() => {
                      dispatch(reviewCard(card!.cardId));
                    }}
                  />
                  <Button text="Bad" />
                </div>
              ) : (
                <Button
                  text={"Show Answer"}
                  clickHandler={() => {
                    setIsShowAnswer(true);
                  }}
                />
              )}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default FlashCard;
