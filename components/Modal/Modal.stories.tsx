import { Button, useDisclosure } from '@chakra-ui/react';

import { Modal } from './Modal';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Modal',
  component: Modal,
};

export const BasicUsage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({ isOpen: true });
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader title="Modal title" onClose={onClose} />
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci animi assumenda delectus dolorum ducimus
          enim inventore ipsum iure, magni maiores modi, molestias, obcaecati praesentium saepe ullam voluptas
          voluptates voluptatibus.
        </ModalBody>
        <ModalFooter>
          <Button w="100%" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
