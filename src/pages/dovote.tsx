import {
    Box,
    Flex,
    Heading,
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
import { AiFillCloseCircle, AiFillHome, AiOutlineArrowRight, AiTwotoneStar } from 'react-icons/ai';
import { TeamScoreDisplay } from '../components/TeamScoreDisplay';
import Router from 'next/router';
import { IconButtonWithTooltip } from '../components/IconButtonWithTooltip';
  
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
          playerfacts: [
              {
                  player: {
                      id: "1",
                      name: "Player 1",
                      photo: "https://www.cricbuzz.com/a/img/v1/152x152/i1/c171047/nitish-rana.jpg",
                  },
                  performance: [
                    "perf1",
                    "perf2",
                    "perf3",
                    "perf4",
                    "perf5",
                  ],
                  ourRating: 1,
              },
              {
                player: {
                  id: "2",
                  name: "Player 2",
                  photo: "https://www.cricbuzz.com/a/img/v1/152x152/i1/c171042/shubman-gill.jpg",
                },
                performance: [
                  "perf1",
                  "perf2",
                  "perf3",
                  "perf4",
                  "perf5",
                ],
                ourRating: 2,
            }
          ],
        },
        team2: {
          id: "12",
          name: "SRH",
          playerfacts: [
            {
                player: {
                    id: "12",
                    name: "Player 12",
                    photo: "https://www.cricbuzz.com/a/img/v1/152x152/i1/c170936/eoin-morgan.jpg",
                },
                performance: [
                  "perf1",
                  "perf2",
                  "perf3",
                  "perf4",
                  "perf5",
                ],
                ourRating: 3,
            },
            {
              player: {
                id: "22",
                name: "Player 22",
                photo: "https://www.cricbuzz.com/a/img/v1/152x152/i1/c170680/dinesh-karthik.jpg",
              },
              performance: [
                "perf1",
                "perf2",
                "perf3",
                "perf4",
                "perf5",
              ],
              ourRating: 5,
          }
        ],
      }
  }
}

class PlayerRating {
  playerId: string;
  rating: number;
  constructor(playerId: string, rating: number) {
    this.playerId = playerId;
    this.rating = rating;
  }
}

class TeamRating {
  teamId: string;
  rating: number;
  playerratings: PlayerRating[];

  constructor(teamId: string) {
    this.teamId = teamId;
    this.rating = 0;
    this.playerratings = [];
  }

  setRating(rating: number) {
    this.rating = rating;
  }

  addPlayer(playerId: string, rating: number) {
    this.playerratings.push(new PlayerRating(playerId, rating));
  }
}

class MatchRatings {
  id: string;
  team1: TeamRating;
  team2: TeamRating;
  constructor(matchId: string, team1Id: string, team2Id: string) {
    this.id = matchId;
    this.team1 = new TeamRating(team1Id);
    this.team2 = new TeamRating(team2Id);
  }

}

let matchRatings: MatchRatings | null = null;

const Index = () => {
    const [rating, setRating] = useState(0);
    const [isTeam1, setIsTeam1] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    
    const clickOnStar0 = () => {
        setRating(0);
    }
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
    const OnSubmit = () => {
      if(isTeam1) {
        matchRatings?.team1.addPlayer(data.match.team1.playerfacts[currentPlayer].player.id, rating);
        if(data.match.team1.playerfacts.length == (currentPlayer + 1)) {
          setCurrentPlayer(0)
          setIsTeam1(false)
        } else {
          setCurrentPlayer(currentPlayer + 1)
        }
      }
      else if(!isTeam1) {
        matchRatings?.team2.addPlayer(data.match.team2.playerfacts[currentPlayer].player.id, rating);
        if(data.match.team2.playerfacts.length == (currentPlayer + 1)) {
          let team1Sum = matchRatings?.team1.playerratings.map(a => a.rating).reduce((acc, cur) => acc + cur);
          let team2Sum = matchRatings?.team2.playerratings.map(a => a.rating).reduce((acc, cur) => acc + cur);
          team1Sum = team1Sum == undefined ? 0 : team1Sum / 11;
          team2Sum = team2Sum == undefined ? 0 : team2Sum / 11;

          team1Sum = team1Sum + (data.match.team1Rating * data.match.count)
          team2Sum = team2Sum + (data.match.team2Rating * data.match.count)

          const avgTeam1Rating = team1Sum / (data.match.count + 1);
          const avgTeam2Rating = team2Sum / (data.match.count + 1);

          matchRatings?.team1.setRating(avgTeam1Rating);
          matchRatings?.team2.setRating(avgTeam2Rating);
          
          console.log(JSON.stringify(matchRatings));
          setIsFinished(true)
        } else {
          setCurrentPlayer(currentPlayer + 1)
        }
      }
    }

    const getPerformanceList = (performance: any) => {
      return performance.map((m, i) => {
        return <Text key={"perf" + i}>{m}</Text>
      });
    }
    const renderPlayerCard = (playerfacts: any, team: string) => {
      return (<Box
        p="2px"
        borderRadius="lg"
        w="100%"
        bg={theme.colors.color2}
        boxShadow="dark-lg"
        maxW="620px"
        mt="20px"
      >
          <Flex direction="column" w="100%" alignItems="center" textAlign="center" p="5px">
            <Avatar name={playerfacts.player.name} size="xl" src={playerfacts.player.photo}/>
            <Heading fontSize="2xl">{playerfacts.player.name}</Heading>
            <Heading as="u" fontSize="1xl">{team}</Heading>
            <Box h="20px"></Box>
            {getPerformanceList(playerfacts.performance)}
            <ButtonGroup variant="outline" spacing="1" mt="6px">
                <Box _hover={{scale: "130%"}}><AiFillCloseCircle size="40px" color="gray" onClick={clickOnStar0}/></Box>
                <Box _hover={{scale: "130%"}}><AiTwotoneStar size="40px" color={rating >= 1 ? theme.colors.wonColor : "gray"} onClick={clickOnStar1}/></Box>
                <Box _hover={{scale: "130%"}}><AiTwotoneStar size="40px" color={rating >= 2 ? theme.colors.wonColor : "gray"} onClick={clickOnStar2}/></Box>
                <Box _hover={{scale: "130%"}}><AiTwotoneStar size="40px" color={rating >= 3 ? theme.colors.wonColor : "gray"} onClick={clickOnStar3}/></Box>
                <Box _hover={{scale: "130%"}}><AiTwotoneStar size="40px" color={rating >= 4 ? theme.colors.wonColor : "gray"} onClick={clickOnStar4}/></Box>
                <Box _hover={{scale: "130%"}}><AiTwotoneStar size="40px" color={rating >= 5 ? theme.colors.wonColor : "gray"} onClick={clickOnStar5}/></Box>
            </ButtonGroup>
            <Button mt="6px" rightIcon={<AiOutlineArrowRight />} bg={theme.colors.color4} onClick={OnSubmit}>Next</Button>
          </Flex>
      </Box>);
    }

    const currentTeam = isTeam1 ? data.match.team1 : data.match.team2;
  
    if(matchRatings == null) {
      matchRatings = new MatchRatings(data.match.id, data.match.team1.id, data.match.team2.id);
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
          
          {
              isFinished ? 
              <Flex direction="column" w="100%" alignItems="center" textAlign="center" p="5px" mt="20px">
                <Heading fontSize="2xl">Thank you for your rating...</Heading>
                <Heading fontSize="sm" mt="20px">The current report card of the match,</Heading>
                <Flex direction="row" justifyContent="space-evenly">
                  <TeamScoreDisplay isWon={!!data.match.team1Won} team={data.match.team1.name} rating={data.match.team1Rating + " / 5 (" + data.match.count + ")"}  />
                  <TeamScoreDisplay isWon={!data.match.team1Won} team={data.match.team2.name} rating={data.match.team1Rating + " / 5(" + data.match.count + ")"}  />
                </Flex>
                <Box mt="20px">
                  <IconButtonWithTooltip id={data.match.id} onClick={() => { Router.push("/")}} toolTip="Goto home" icon={<AiFillHome />} />
                </Box>
              </Flex>
              :
              renderPlayerCard(currentTeam.playerfacts[currentPlayer], currentTeam.name)
            }
      </Box>
      
      <Footer />
    </Container>
  );
}
  
  export default Index
  