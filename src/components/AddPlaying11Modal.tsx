import {
    Flex,
    Input,
    Button,
    Modal,
    useDisclosure,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Table,
    Thead,
    Th,
    Tbody,
    Tr,
    Td,
    Avatar,
    Checkbox
} from '@chakra-ui/react'
import theme from "../theme";
import React, { useState } from 'react';
import { Player } from "../models/addMatchModel";
import AddPlayerModal from './AddPlayerModal';

interface AddPlaying11ModalProps {
    onSuccess: (data: Player[]) => void
    team: string
}

const data = {
    players: [
        {
            id: "2258",
            name: "Jos Buttler",
            photo: "https://www.cricbuzz.com/a/img/v1/152x152/i1/c170980/jos-buttler.jpg"
        },
        {
            id: "13940",
            name: "Yashasvi Jaiswal",
            photo: ""
        },
        {
            id: "8271",
            name: "Sanju Samson",
            photo: "https://www.cricbuzz.com/a/img/v1/152x152/i1/c193526/sanju-samson.jpg"
        },
        {
            id: "6349",
            name: "David Miller",
            photo: "https://www.cricbuzz.com/a/img/v1/152x152/i1/c170687/david-miller.jpg"
        },
        {
            id: "12305",
            name: "Riyan Parag",
            photo: "https://www.cricbuzz.com/a/img/v1/152x152/i1/c156160/riyan-parag.jpg"
        },
    ]
}

const AddPlaying11Modal = (props: AddPlaying11ModalProps) => {
    const {isOpen, onOpen, onClose}  = useDisclosure();
    const [searchValue, setSearch] = useState<string>("");
    const [forceUpdate, setForceUpdate] = useState<boolean>(false);
    const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
    
    const isPlayerSelected = (id: string) => {
        for (let index = 0; index < selectedPlayers.length; index++) {
            if(selectedPlayers[index].id === id) {
                return true;
            }            
        }
        return false;
    }
    const playerIndex = (id: string) => {
        for (let index = 0; index < selectedPlayers.length; index++) {
            if(selectedPlayers[index].id === id) {
                return index;
            }            
        }
        return -1;
    }

    const OnSubmit = () => {
        props.onSuccess([...selectedPlayers]);
        onClose();
    }

    const OnClear = () => {
        setSelectedPlayers([...[]]);
    }

    const OnAddingAPlayer = (plr: Player) => {
        data.players.push(plr);
        setForceUpdate(!forceUpdate);
    }

    const onSelectingOrDeselectingPlayer = (isChecked: boolean, id: string, player: Player) => {
        if(isChecked) {
            if(!isPlayerSelected(id)) {
                setSelectedPlayers([...selectedPlayers, player]);
            }
        } else {
            if(isPlayerSelected(id)) {
                const index = playerIndex(id);
                setSelectedPlayers([...selectedPlayers.slice(0, index), ...selectedPlayers.slice(index+1)]);
            }
        }
    }

    const renderRow = () => {
        return data.players.map(p => {
            if(searchValue.length < 4 || p.name.toLowerCase().includes(searchValue.toLowerCase()))
                return (<Tr key={p.id}>
                        <Td><Avatar name={p.name} src={p.photo}/></Td>
                        <Td>{p.name}</Td>
                        <Td>
                            <Checkbox colorScheme="green" my="5px" isChecked={isPlayerSelected(p.id)} onChange={e => onSelectingOrDeselectingPlayer(Boolean(e.target.checked), p.id, p)}>
                            </Checkbox>
                        </Td>
                    </Tr>);
        })
    }
    return (
    <>
        <Button ml="6px" bg={theme.colors.color4} onClick={onOpen} isDisabled={props.team.length === 0}>Add Playing 11</Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          closeOnOverlayClick={false}
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent bg={theme.colors.color1} color={theme.colors.color3} >
            <ModalHeader>{props.team} : Select Playing 11 : {selectedPlayers.length}</ModalHeader>
            <ModalBody p={5}>
            <Input placeholder="Search for player" value={searchValue} onChange={e => setSearch(e.target.value)} />
              <Table colorScheme="whiteAlpha" size="xs">
                  <Thead>
                      <Tr>
                        <Th>Image</Th>
                        <Th>Name</Th>
                        <Th>Select</Th>
                      </Tr>
                  </Thead>
                  <Tbody>
                      {renderRow()}
                  </Tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Flex w="100%" direction="row" justifyContent="space-around">
                <AddPlayerModal onSuccess={OnAddingAPlayer} />
                <Button isDisabled={selectedPlayers.length != 3} bg={theme.colors.color4} onClick={OnSubmit}>
                    Save
                </Button>
                <Button isDisabled={selectedPlayers.length == 0} onClick={OnClear}>
                    Clear
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
    );
}

export default AddPlaying11Modal;
