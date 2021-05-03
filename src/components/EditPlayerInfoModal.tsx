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
    Checkbox,
    Box,
    Avatar,
    Flex,
    Text,
    Heading
} from '@chakra-ui/react'
import theme from "../theme";
import React, { useState } from 'react';
import { PlayerInfo } from "../models/addMatchModel";

interface EditPlayerInfoModalProps {
    onSuccess: (data: PlayerInfo) => void
    playerInfo: PlayerInfo
    playerId: string
    name: string
    photo: string
}

const EditPlayerInfoModal = (props: EditPlayerInfoModalProps) => {
    const {isOpen, onOpen, onClose}  = useDisclosure();
    const [info, setInfo] = useState<PlayerInfo>(new PlayerInfo())
    const [performance1, setPerformance1] = useState<string>("")
    const [performance2, setPerformance2] = useState<string>("")
    const [performance3, setPerformance3] = useState<string>("")
    const [performance4, setPerformance4] = useState<string>("")
    const [performance5, setPerformance5] = useState<string>("")

    if(info.id === "") {
      setInfo(props.playerInfo);
    }
    
    const OnSubmit = () => {
      info.isReady = true;
      info.performance.performance = []
        if(performance1.length > 0) {
          info.performance.performance.push(performance1);
        }
        if(performance2.length > 0) {
          info.performance.performance.push(performance2);
        }
        if(performance3.length > 0) {
          info.performance.performance.push(performance3);
        }
        if(performance4.length > 0) {
          info.performance.performance.push(performance4);
        }
        if(performance5.length > 0) {
          info.performance.performance.push(performance5);
        }
        console.log(JSON.stringify(info));
        props.onSuccess(info);
        onClose();
    }

    return (
    <>
        <Box flex="1" textAlign="right"><Button bg={theme.colors.color2} size="xs" onClick={onOpen}>Edit</Button></Box>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          closeOnOverlayClick={false}
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent bg={theme.colors.color1} color={theme.colors.color3} >
            <ModalHeader>
              <Box flex="1" textAlign="left">
                  <Flex direction="row" alignItems="center">
                    <Avatar name={props.name} src={props.photo}/>
                    <Text ml="6px">{props.name}</Text>
                  </Flex>
              </Box>
            </ModalHeader>
            <ModalBody p={5}>
              <Box>
              <Checkbox colorScheme="green" my="5px" checked={info.isBatting} onChange={e => {
                    setInfo({...info, isBatting: Boolean(e.target.checked)})
                  }}>
                Is Batting
              </Checkbox>
              </Box>
              {
                info.isBatting ?
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
                    <Input type="number" value={info.batting.runs} onChange={e => {
                      setInfo({...info, batting: {...info.batting, runs: Number(e.target.value)}})
                    }} />
                    <Input type="number" value={info.batting.balls} onChange={e => {
                      setInfo({...info, batting: {...info.batting, balls: Number(e.target.value)}})
                    }} />
                    <Input type="number" value={info.batting.fours} onChange={e => {
                      setInfo({...info, batting: {...info.batting, fours: Number(e.target.value)}})
                    }} />
                    <Input type="number" value={info.batting.sixes} onChange={e => {
                      setInfo({...info, batting: {...info.batting, sixes: Number(e.target.value)}})
                    }} />
                    <Input type="number" value={info.batting.sr} onChange={e => {
                      setInfo({...info, batting: {...info.batting, sr: Number(e.target.value)}})
                    }} />
                  </Flex>
                  <Text>Status</Text>
                  <Input value={info.batting.status} onChange={e => {
                      setInfo({...info, batting: {...info.batting, status: e.target.value}})
                  }} />
                  </>
                  :
                  <><Text fontSize="xs">Not batted</Text></> 
              }
              <Box><Checkbox colorScheme="green" my="5px" checked={info.isBowling} onChange={e => {
                    setInfo({...info, isBowling: Boolean(e.target.checked)})
                  }}>
                Is Bowling
              </Checkbox>
              </Box>
              {
                info.isBowling ?
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
                    <Input type="number" value={info.bowling.overs} onChange={e => {
                      setInfo({...info, bowling: {...info.bowling, overs: Number(e.target.value)}})
                    }} />
                    <Input type="number" value={info.bowling.runs} onChange={e => {
                      setInfo({...info, bowling: {...info.bowling, runs: Number(e.target.value)}})
                    }} />
                    <Input type="number" value={info.bowling.maindains} onChange={e => {
                      setInfo({...info, bowling: {...info.bowling, maindains: Number(e.target.value)}})
                    }} />
                    <Input type="number" value={info.bowling.wickets} onChange={e => {
                      setInfo({...info, bowling: {...info.bowling, wickets: Number(e.target.value)}})
                    }} />
                    <Input type="number" value={info.bowling.economy} onChange={e => {
                      setInfo({...info, bowling: {...info.bowling, economy: Number(e.target.value)}})
                    }} />
                  </Flex>
                  </>
                  :
                  <><Text fontSize="xs">Not bowled</Text></> 
              }
              <Heading fontSize="sm" mt="5px">Rating</Heading>
              <Input type="number" value={info.rating.defaultRating} onChange={e => {
                      setInfo({...info, rating: {...info.rating, defaultRating: Number(e.target.value)}})
                    }} />
              <Heading fontSize="sm" mt="5px">Performance</Heading>
              <Input value={performance1} onChange={e => setPerformance1(e.target.value)} />
              <Input value={performance2} onChange={e => setPerformance2(e.target.value)} />
              <Input value={performance3} onChange={e => setPerformance3(e.target.value)} />
              <Input value={performance4} onChange={e => setPerformance4(e.target.value)} />
              <Input value={performance5} onChange={e => setPerformance5(e.target.value)} />
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

export default EditPlayerInfoModal;
