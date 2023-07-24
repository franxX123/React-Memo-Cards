import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import FlashCard, { FlashCardType } from "../components/FlashCard";
import { useAppSelector } from "../hooks";
import { selectDeck, Card } from "../deckSlice/deckSlice";
import AddFlashCard from "../components/AddFlashCard";

const StudyPage: React.FC = () => {
  const deck = useAppSelector(selectDeck);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [card, setCard] = useState<Card | undefined>();

  useEffect(() => {
    const newCard = deck.find((cardEl) => !cardEl.isReviewed);
    setCard(newCard);
  }, [deck]);

  // const updateCard = (card: Card) => {
  //   setCard(card);
  // };

  const closeCardHandler = () => {
    setIsAddCardOpen(false);
  };

  return (
    <div className="mt-[150px]">
      <div className="mx-auto w-[500px]">
        {/* Flash Card Component for study */}
        <div className="mt-12">
          <div className="mb-5 flex justify-between items-center">
            <h1 className="text-3xl font-semibold">Memory Cards</h1>
            <Button
              clickHandler={() => {
                setIsAddCardOpen((prev) => !prev);
              }}
              text="Add Card"
            />
          </div>
          {card && (
            <>
              <FlashCard card={card} initCardType={FlashCardType.study} />
            </>
          )}

          {!card && (
            <div className="flex justify-center items-center font-semibold text-green-400 text-center w-[500px] h-[350px] border border-slate-200 rounded-md shadow-md">
              <h1 className="text-2xl text-slate-600">No Cards to Review</h1>
            </div>
          )}
        </div>

        {/* Flash Card Component for Adding*/}
        {isAddCardOpen && (
          <div className="mt-12">
            <div className="mb-5 flex justify-center items-center">
              <h1 className="text-3xl font-semibold">Add Flash Card</h1>
            </div>

            <AddFlashCard closeCardHandler={closeCardHandler} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPage;
