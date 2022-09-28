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
  const { isOpen, onClose, onOpen } = useDisclosure()

  const [image, setImage] = useState('')

  async function handleViewImage(url: string) {
    await new Promise(resolve => resolve(setImage(url))).then(data => onOpen())
  }
  return (
    <>
      <SimpleGrid columns={3} spacing='2.5rem'>
        {cards.map(card => (
          <Card key={card.id} data={card} viewImage={() => handleViewImage(card.url)} />
        ))}
      </SimpleGrid>
      {isOpen && <ModalViewImage imgUrl={image} isOpen={isOpen} onClose={onClose}  ></ModalViewImage>}
    </>
  );
}
