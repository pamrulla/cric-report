import {
    Box,
    Flex,
    Heading,
    Avatar,
    Text,
    Button,
    ButtonGroup, 
  } from '@chakra-ui/react'
  
import { Hero } from '../../components/Hero'
import { Container } from '../../components/Container'
import { Footer } from '../../components/Footer'
import React, { useState } from 'react';
import theme from '../../theme';
import { MatchInfo } from '../../components/MatchInfo';
import { AiFillCloseCircle, AiFillHome, AiOutlineArrowRight, AiTwotoneStar } from 'react-icons/ai';
import { TeamScoreDisplay } from '../../components/TeamScoreDisplay';
import Router, { useRouter } from 'next/router';
import { IconButtonWithTooltip } from '../../components/IconButtonWithTooltip';
import { useMutation, useQuery } from '@apollo/client';
import { MATCH_DOVOTE } from '../../graphql/queries';
import { PerformanceData } from '../../models/apidatamodels';
import { UPLOAD_RATING } from '../../graphql/mutations';
  
class PlayerRating {
  playerId: string;
  rating: number;
  constructor(playerId: string, rating: number) {
    this.playerId = playerId;
    this.rating = rating;
  }
}

class TeamRating {
  id: string = "";
  teamRating: number = 0;
  rating: PlayerRating[] = [];
  count: number = 0;

  setRating(rating: number) {
    this.teamRating = rating;
  }

  addPlayer(playerId: string, rating: number, currentRating : number, count : number) {
    const nr = (rating + (currentRating * count)) / (count + 1);
    this.rating.push(new PlayerRating(playerId, nr));
  }
}

class MatchRatings {
  id: string = "";
  teams: TeamRating[] = [];
}

let matchRatings: MatchRatings = new MatchRatings();

const Index = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [teamIndex, setTeamIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  
  const {data, loading, error} = useQuery(MATCH_DOVOTE, {variables: {id: router.query.id}, onCompleted: (d) => {
    setRating(d.match.teams[teamIndex].rating[0].defaultRating);
  }});
  const [uploadRating, {data: uploadData, loading: uploadLoading, error: uploadError}] = useMutation(UPLOAD_RATING);

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
      if(matchRatings.teams.length == teamIndex) {
        matchRatings.teams.push(new TeamRating());
        matchRatings.teams[teamIndex].id = data.match.teams[teamIndex].id;
      }
      matchRatings.teams[teamIndex].addPlayer(data.match.teams[teamIndex].rating[currentPlayer].player.id, rating, data.match.teams[teamIndex].rating[currentPlayer].rating, data.match.teams[teamIndex].count);
      if(data.match.teams[teamIndex].rating.length == (currentPlayer + 1)) {
        if(teamIndex < (data.match.teams.length-1)) {
          setRating(data.match.teams[teamIndex + 1].rating[0].defaultRating);
          setCurrentPlayer(0)
          setTeamIndex(teamIndex + 1)
        } else {
          let sums : number[] = [];
          for (let index = 0; index < matchRatings.teams.length; index++) {
            let s = matchRatings.teams[index].rating.map(a => a.rating).reduce((acc, cur) => acc + cur);
            sums.push(s);    
          }
          for (let index = 0; index < sums.length; index++) {
            sums[index] = sums[index] / data.match.teams[index].rating.length;
            sums[index] = sums[index] + (data.match.teams[index].teamRating * data.match.teams[index].count);
            sums[index] = sums[index] / (data.match.teams[index].count + 1);
            matchRatings.teams[index].setRating(sums[index]);
            matchRatings.teams[index].count = data.match.teams[index].count + 1;
          }          
          setIsFinished(true)
          matchRatings.id = data.match.id;
          uploadRating({variables: {input: matchRatings}});
        }
      } else {
        setRating(data.match.teams[teamIndex].rating[currentPlayer + 1].defaultRating);
        setCurrentPlayer(currentPlayer + 1)
      }
    }

    const getPerformanceList = (performance: PerformanceData) => {
      return performance.performance.map((m: string, i) => {
        return <Text key={performance.player.id + ":" + i}>{m}</Text>
      });
    }
    const renderPlayerCard = (playerfacts: PerformanceData, team: string) => {
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
            {getPerformanceList(playerfacts)}
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

    let currentTeam = null;

    if(data != undefined && teamIndex < data.match.teams.length) {
      currentTeam = data?.match.teams[teamIndex];
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
          {
            loading ? <Text>Loading match data, please wait...</Text> :
            error ? <Text>Error while loading match data, try again...</Text> :
            <>
            <Flex direction="column" alignItems="center" textAlign="center">
            <MatchInfo team1={data.match.teams[0].name} team2={data.match.teams[1].name} result={data.match.result} mathDate={data.match.date} />  
            </Flex>
            {
              isFinished ? 
              <Flex direction="column" w="100%" alignItems="center" textAlign="center" p="5px" mt="20px">
                {
                  uploadLoading ? <Text>Updating match rating, please wait...</Text> :
                  uploadError ? <Text>Error while updating match rating, try again...</Text> :
                  <>
                    <Heading fontSize="2xl">Thank you for your rating...</Heading>
                    <Heading fontSize="sm" mt="20px">The current report card of the match,</Heading>
                    <Flex direction="row" justifyContent="space-evenly">
                      <TeamScoreDisplay isWon={!!uploadData.updateRating.teams[0].isWon} team={uploadData.updateRating.teams[0].name} rating={(Math.round(uploadData.updateRating.teams[0].teamRating * 100) / 100) + " / 5 (" + uploadData.updateRating.teams[0].count + ")"}  />
                      <TeamScoreDisplay isWon={!!uploadData.updateRating.teams[1].isWon} team={uploadData.updateRating.teams[1].name} rating={(Math.round(uploadData.updateRating.teams[1].teamRating * 100) / 100) + " / 5(" + uploadData.updateRating.teams[1].count + ")"}  />
                    </Flex>
                    <Box mt="20px">
                      <IconButtonWithTooltip id={data.match.id} onClick={() => { Router.push("/")}} toolTip="Goto home" icon={<AiFillHome />} />
                    </Box>
                    </>
                }
              </Flex>
              :
              currentTeam ? renderPlayerCard(currentTeam.performance[currentPlayer], currentTeam.name) : <></>
            }
            </>
          }
      </Box>
      
      <Footer />
    </Container>
  );
}
  
  export default Index
  