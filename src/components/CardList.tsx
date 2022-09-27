import { Modal, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const {isOpen ,onClose } = useDisclosure()
  const [image, setImage] = useState('')

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE

  return (
    <>
      {/* TODO CARD GRID */}
      {cards.map(card=>(
      <Card data={card} viewImage={()=>setImage(card.url)}/>
      ))}
      {/* TODO MODALVIEWIMAGE */}
      {isOpen && <ModalViewImage imgUrl={image} isOpen={isOpen} onClose={onClose}  ></ModalViewImage> }
    </>
  );
}
