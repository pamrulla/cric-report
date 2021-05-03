import {
    Input,
    Button,
    Modal,
    useDisclosure,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalHeader
} from '@chakra-ui/react'
import theme from "../theme";
import React, { useState } from 'react';
import { Player } from "../models/addMatchModel";

interface AddPlayerModalProps {
    onSuccess: (data: Player) => void
}

const AddPlayerModal = (props: AddPlayerModalProps) => {
    const {isOpen, onOpen, onClose}  = useDisclosure();
    const [player, setPlayer] = useState<Player>(new Player())

    const OnSubmit = () => {
        console.log(JSON.stringify(player));
        player.id = "5";
        props.onSuccess(player);
        onClose();
    }

    return (
    <>
        <Button ml="6px" bg={theme.colors.color4} onClick={onOpen}>Add Player</Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent bg={theme.colors.color1} color={theme.colors.color3} >
            <ModalHeader>Add a Player</ModalHeader>
            <ModalBody p={5}>
              <Input placeholder="Name" name="player-name" value={player.name} onChange={e => setPlayer({...player, name: e.target.value})} />
              <Input placeholder="Photo" name="player-photo" value={player.photo} onChange={e => setPlayer({...player, photo: e.target.value})} />
            </ModalBody>
            <ModalFooter>
              <Button bg={theme.colors.color4} mr={3} onClick={OnSubmit}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
    );
}

export default AddPlayerModal;
