import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Text
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalBody maxWidth='56,25rem' maxHeight='37,5rem' p='0' >
            <Image src={imgUrl} />
            <ModalFooter background='gray.800' display='flex' justifyContent='flex-start'>
              <Link href={imgUrl}>Abrir original</Link>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}
