import {
    Box,
    Flex,
    Heading,
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel, 
    Table, 
    Thead, 
    Th, 
    Tbody, 
    Tr, 
    Td, 
    Center,
    Avatar,
    Text,
    Button,
    ButtonGroup, 
  } from '@chakra-ui/react'
  
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import React, { useState } from 'react';
import theme from '../theme';
import { MatchInfo } from '../components/MatchInfo';
import { AiOutlineArrowRight, AiTwotoneStar } from 'react-icons/ai';
  
  const data = {
    match : {
        id: "1",
        date: "Apr 28, 2019",
        result: "CSK Won by 7 wickets",
        team1Won: true,
        team1Rating: 2.3,
        team2Rating: 5,
        count: 10,
        team1: {
          id: "11",
          name: "CSK",
          ratings: [
              {
                  player: {
                      name: "Player 1"
                  },
                  rating: 2.5,
              },
              {
                player: {
                    name: "Player 2"
                },
                rating: 1.25,
            }
          ],
        },
        team2: {
          id: "12",
          name: "SRH",
          ratings: [
            {
                player: {
                    name: "Player 12"
                },
                rating: 2.5,
            },
            {
              player: {
                  name: "Player 22"
              },
              rating: 1.25,
          }
        ],
      }
  }
}

const Index = () => {
    const [rating, setRating] = useState(0);
    
    const clickOnStar1 = () => {
        setRating(1);
    }
    const clickOnStar2 = () => {
        setRating(2);
    }
    const clickOnStar3 = () => {
        setRating(3);
    }
    const clickOnStar4 = () => {
        setRating(4);
    }
    const clickOnStar5 = () => {
        setRating(5);
    }

    return (
  
    <Container>
      <Hero title="Report Card"/>
      <Box
        p="2px"
        borderRadius="lg"
        w="100%"
        bg={theme.colors.color2}
        boxShadow="dark-lg"
        maxW="620px"
      >
          <Flex direction="column" alignItems="center" textAlign="center">
            <MatchInfo team1={data.match.team1.name} team2={data.match.team2.name} result={data.match.result} mathDate={data.match.date} />              
          </Flex>
      </Box>
      <Box
        p="2px"
        borderRadius="lg"
        w="100%"
        bg={theme.colors.color2}
        boxShadow="dark-lg"
        maxW="620px"
        mt="20px"
      >
          <Flex direction="column" w="100%" alignItems="center" textAlign="center" p="5px">
            <Avatar name="Player 1" size="xl" src="https://www.cricbuzz.com/a/img/v1/152x152/i1/c170698/quinton-de-kock.jpg"/>
            <Heading fontSize="2xl">Player 1 Player 1 Player 1</Heading>
            <Heading as="u" fontSize="2xl">PERFORMANCE</Heading>
            <Box h="20px"></Box>
            <Text>Runs 1</Text>
            <Text>Runs 1</Text>
            <Text>Runs 1</Text>
            <Text>Runs 1</Text>
            <Text>Runs 1</Text>
            <ButtonGroup variant="outline" spacing="1" mt="6px">
                <AiTwotoneStar size="50px" color={rating >= 1 ? theme.colors.wonColor : "gray"} onClick={clickOnStar1}/>
                <AiTwotoneStar size="50px" color={rating >= 2 ? theme.colors.wonColor : "gray"} onClick={clickOnStar2}/>
                <AiTwotoneStar size="50px" color={rating >= 3 ? theme.colors.wonColor : "gray"} onClick={clickOnStar3}/>
                <AiTwotoneStar size="50px" color={rating >= 4 ? theme.colors.wonColor : "gray"} onClick={clickOnStar4}/>
                <AiTwotoneStar size="50px" color={rating >= 5 ? theme.colors.wonColor : "gray"} onClick={clickOnStar5}/>
            </ButtonGroup>
            <Button mt="6px" rightIcon={<AiOutlineArrowRight />} bg={theme.colors.color4}>Next</Button>
          </Flex>
      </Box>
      <Footer />
    </Container>
  );
}
  
  export default Index
  