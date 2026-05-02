import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCardById, saveCard } from '../utils/helper';
import AddCard from './AddCard';

const EditCard = () => {
  const { id } = useParams();

  const [card, setCard] = useState(null);

  useEffect(() => {
    const loadCards = async () => {
      const cardData = await getCardById(Number(id));
      setCard(cardData);
    };
    loadCards();
  }, [id]);

  if (card === null) return <>Loading...</>;
  if (!card) return <>Card not found</>; // to-do change it to something else

  return <AddCard existingCard={card} id={id} saveCard={saveCard} />;
};

export default EditCard;
