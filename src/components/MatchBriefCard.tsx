import {
    Box,
    Center,
    Flex,
    Heading,
    Spacer,
  } from '@chakra-ui/react'
  
import { AiFillEye, AiFillFileAdd, AiFillFund } from 'react-icons/ai';
import {TeamScoreDisplay} from "./TeamScoreDisplay";
import theme from '../theme'
import { IconButtonWithTooltip } from './IconButtonWithTooltip';
import { MatchInfo } from "./MatchInfo";
import Router from 'next/router';

interface MatchBriefCardProps {
    id: string,
    team1: string,
    team2: string,
    isTeam1Won?: boolean,
    result: string,
    mathDate: string,
    team1Rating: string,
    team2Rating: string,
    count: number,
    mt?: string
}

const OnViewScoreCard = (id: string) => {
    console.log("On View Score Card " + id);
    Router.push("/scorecard");
}
const OnViewRatings = (id: string) => {
    console.log("On View Ratings " + id);
    Router.push("/viewrating");
}
const OnGiveRating = (id: string) => {
    console.log("On Give Rating " + id)
}

export const MatchBriefCard = (props: MatchBriefCardProps) => {
    const {id, team1, team2, isTeam1Won, result, mathDate, team1Rating: team1Score, team2Rating: team2Score, count, ...rest} = props;

    return (<Box
      p="5px"
      borderRadius="lg"
      w="100%"
      bg={theme.colors.color2}
      boxShadow="dark-lg"
      {...rest}
      key={id}
    >
      <Flex direction="column">
        <Flex direction="row">
          <MatchInfo team1={team1} team2={team2} result={result} mathDate={mathDate} />
          <Spacer/>
          <IconButtonWithTooltip id={id} onClick={OnViewScoreCard} toolTip="View the match scorecard" icon={<AiFillFund />} />
        </Flex>
        <Center h="30px">
          <Box borderTopColor={theme.colors.color1} borderTopStyle="solid" borderTopWidth="1px" w="50%"></Box>
        </Center>
        <Flex direction="row" justifyContent="space-between">
            <TeamScoreDisplay isWon={!!isTeam1Won} team={team1} rating={team1Score + " / 5 (" + count + ")"}  />
            <TeamScoreDisplay isWon={!isTeam1Won} team={team2} rating={team2Score + " / 5(" + count + ")"}  />
            <IconButtonWithTooltip id={id} onClick={OnViewRatings} toolTip="View details of the match rating" icon={<AiFillEye />} />
            <IconButtonWithTooltip id={id} onClick={OnGiveRating} toolTip="Submit your rating for the match" icon={<AiFillFileAdd />} />
        </Flex>
      </Flex>
    </Box>
)
}
