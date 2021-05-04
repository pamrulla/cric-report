import {
    Input,
    Button,
    Modal,
    useDisclosure,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalHeader,
    FormControl,
    FormLabel,
    Checkbox,
    Text,
    Accordion,
    AccordionItem,
    Box,
    Flex,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Avatar,
    Heading
} from '@chakra-ui/react'
import theme from "../theme";
import React, { useState } from 'react';
import { Team, Player, PlayerInfo } from "../models/addMatchModel";
import AddPlaying11Modal from './AddPlaying11Modal';
import EditPlayerInfoModal from './EditPlayerInfoModal';

interface AddTeamModalProps {
    onSuccess: (data: Team) => void
}

const AddTeamModal = (props: AddTeamModalProps) => {
    const {isOpen, onOpen, onClose}  = useDisclosure();
    const [team, setTeam] = useState<Team>(new Team())
    const [players, setPlayers] = useState<Player[]>([])
    const [playersInfo, setPlayersInfo] = useState<PlayerInfo[]>([])

    const OnSubmit = () => {
      
      team.count = 0;
      team.teamRating = 0;
      team.batting = [];
      team.bowling = [];
      team.performance = [];
      team.rating = [];

      playersInfo.forEach(info => {
        if(info.isBatting) {
          team.batting.push(info.batting)
          team.batting[team.batting.length-1].playerId = info.id;
        }
        if(info.isBowling) {
          team.bowling.push(info.bowling)
          team.bowling[team.bowling.length-1].playerId = info.id;
        }
        
        team.rating.push(info.rating);
        team.rating[team.rating.length-1].playerId = info.id;

        team.performance.push(info.performance);
        team.performance[team.performance.length-1].playerId = info.id;
      });

      props.onSuccess(team);
      onClose();
    }

    const OnPlaying11Selection = (plrs: Player[]) => {
      setTeam({...team, playingIds: plrs.map(p => p.id)});
      setPlayers([...plrs]);
      setPlayersInfo([...plrs.map(p => { 
          let info = new PlayerInfo; 
          info.id = p.id; 
          return info; 
        })
      ]);
    }

    const OnUpdatePlayer = (info : PlayerInfo) => {
      for (let index = 0; index < playersInfo.length; index++) {
        if(playersInfo[index].id === info.id) {
          playersInfo[index] = info;
        }
        setPlayersInfo([...playersInfo]);        
      }
    }

    const hasPlayerInfo = (id: string) => {
      for (let index = 0; index < playersInfo.length; index++) {
        if(playersInfo[index].id === id && playersInfo[index].isReady)
          return true;
      }
      return false;
    }

    const getPlayerInfo = (id: string) => {
      for (let index = 0; index < playersInfo.length; index++) {
        if(playersInfo[index].id === id)
          return playersInfo[index];
      }
      return new PlayerInfo();
    }

    const renderPlayerInfo = (id: string, name: string, photo: string) => {
        if(hasPlayerInfo(id)) {
          const info = getPlayerInfo(id)
          return (
          <>
            {info?.isBatting ? 
              <>
                <Heading fontSize="sm">Batting</Heading>
                <Flex direction="row" alignItems="center" justifyContent="space-around">
                  <Text>R</Text>
                  <Text>B</Text>
                  <Text>4s</Text>
                  <Text>6s</Text>
                  <Text>S/R</Text>
                </Flex>
                <Flex direction="row" alignItems="center" justifyContent="space-around">
                  <Text>{info.batting.runs}</Text>
                  <Text>{info.batting.balls}</Text>
                  <Text>{info.batting.fours}</Text>
                  <Text>{info.batting.sixes}</Text>
                  <Text>{info.batting.sr}</Text>
                </Flex>                
                <Text>{info.batting.status}</Text>
              </>
              :
              <><Text>Not Batted</Text></>
            }
            {info?.isBowling ? 
              <>
                <Heading fontSize="sm">Bowling</Heading>
                <Flex direction="row" alignItems="center" justifyContent="space-around">
                  <Text>O</Text>
                  <Text>R</Text>
                  <Text>M</Text>
                  <Text>W</Text>
                  <Text>Eco</Text>
                </Flex>
                <Flex direction="row" alignItems="center" justifyContent="space-around">
                  <Text>{info.bowling.overs}</Text>
                  <Text>{info.bowling.runs}</Text>
                  <Text>{info.bowling.maindains}</Text>
                  <Text>{info.bowling.wickets}</Text>
                  <Text>{info.bowling.economy}</Text>
                </Flex>                
              </>
              :
              <><Text>Not Bowled</Text></>
            }
            <Heading fontSize="sm">Default Rating: {info?.rating.defaultRating}</Heading>            
            <Heading fontSize="sm">Performance</Heading>
            <Flex direction="column" alignItems="left">
            {
              info?.performance.performance.map((p, i) => <Text key={i}>{p}</Text>)
            }
            </Flex>    
            <EditPlayerInfoModal onSuccess={OnUpdatePlayer} name={name} photo={photo} playerId={id} playerInfo={info} />      
          </>
          );
        } else {
          return (
            <>
              <Text>No data entered for the player</Text>
              <EditPlayerInfoModal onSuccess={OnUpdatePlayer} name={name} photo={photo} playerId={id} playerInfo={getPlayerInfo(id)} />
            </>);
        }
    }
    const renderPlayers = () => {
      return players.map(g => {
        return <AccordionItem key={g.id}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Flex direction="row" alignItems="center">
                        <Avatar name={g.name} src={g.photo}/>
                        <Text ml="6px">{g.name}</Text>
                      </Flex>
                  </Box>
                  <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {renderPlayerInfo(g.id, g.name, g.photo)}
                </AccordionPanel>
        </AccordionItem>
      })
    }

    return (
    <>
        <Button ml="6px" bg={theme.colors.color4} onClick={onOpen}>Add Team</Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          closeOnOverlayClick={false}
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent bg={theme.colors.color1} color={theme.colors.color3} >
            <ModalHeader>Add a Team</ModalHeader>
            <ModalBody p={5}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Name of the Team" name="team-name" value={team.name} onChange={e => setTeam({...team, name: e.target.value})} />
              </FormControl>
              <Checkbox colorScheme="green" my="5px" isChecked={team.isWon} onChange={e => setTeam({...team, isWon: Boolean(e.target.checked)})}>
                Is Won
              </Checkbox>
              <FormControl>
                <FormLabel>Total</FormLabel>
                <Input placeholder="Total of the Team" name="team-total" value={team.total} onChange={e => setTeam({...team, total: e.target.value})} />
              </FormControl>
              <FormControl>
                <FormLabel>Overs</FormLabel>
                <Input type="number" placeholder="Overs of the Team" name="team-overs" value={team.overs} onChange={e => setTeam({...team, overs: Number(e.target.value)})} />
              </FormControl>
              <FormControl>
                <FormLabel>Extras</FormLabel>
                <Input type="number" placeholder="Extras" name="team-extras" value={team.extras} onChange={e => setTeam({...team, extras: Number(e.target.value)})} />
              </FormControl>
              <Text>Players: {players.length}</Text>
              <Accordion allowToggle>
                {renderPlayers()}
              </Accordion>
            </ModalBody>
            <ModalFooter>
              <AddPlaying11Modal team={team.name} onSuccess={OnPlaying11Selection}></AddPlaying11Modal>
              <Button bg={theme.colors.color4} mx={3} onClick={OnSubmit}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
    );
}

export default AddTeamModal;
