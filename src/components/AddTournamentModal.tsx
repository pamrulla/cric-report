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
import { useMutation } from "@apollo/client";
import theme from "../theme";
import React, { useState } from 'react';
import { Tournament } from "../models/addMatchModel";
import { ADD_TOURNAMENT } from '../graphql/mutations';

interface AddTournamentModalProps {
    onSuccess: (data: Tournament) => void
}

const AddTournamentModal = (props: AddTournamentModalProps) => {

    const [addTournament, {loading: addTournamentInProgress}] = useMutation(ADD_TOURNAMENT, 
      {
        onCompleted(data){
          const tr: Tournament = data.addTournament;
          props.onSuccess(tr);
          onClose();
        }
      });

    const {isOpen, onOpen, onClose}  = useDisclosure();
    const [tournament, setTorunament] = useState<Tournament>(new Tournament())

    const OnSubmit = () => {
        addTournament({variables: {name: tournament.name, host: tournament.host, year: tournament.year}});
    }

    return (
    <>
        <Button ml="6px" bg={theme.colors.color4} onClick={onOpen} fontSize="xs">Add Torunament</Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent bg={theme.colors.color1} color={theme.colors.color3} >
            <ModalHeader>Add a Tournament</ModalHeader>
            <ModalBody p={5}>
              <Input placeholder="Name of the Tournament" name="tournament-name" value={tournament.name} onChange={e => setTorunament({...tournament, name: e.target.value})} />
              <Input placeholder="Host of the Tournament" name="tournament-host" value={tournament.host} onChange={e => setTorunament({...tournament, host: e.target.value})} />
              <Input placeholder="Year of the Tournament" name="tournament-year" value={tournament.year} onChange={e => setTorunament({...tournament, year: Number(e.target.value)})} />
            </ModalBody>
            <ModalFooter>
              <Button bg={theme.colors.color4} mr={3} onClick={OnSubmit} loadingText="please wait" isLoading={addTournamentInProgress}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
    );
}

export default AddTournamentModal;
