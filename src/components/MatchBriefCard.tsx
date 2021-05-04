import {
    Box,
    Center,
    Flex,
    Spacer,
  } from '@chakra-ui/react'
  
import { AiFillEye, AiFillFileAdd, AiFillFund } from 'react-icons/ai';
import {TeamScoreDisplay} from "./TeamScoreDisplay";
import theme from '../theme'
import { IconButtonWithTooltip } from './IconButtonWithTooltip';
import { MatchInfo } from "./MatchInfo";
import Router from 'next/router';
import { MatchData } from '../models/apidatamodels';

interface MatchBriefCardProps {
    match: MatchData,
    mt?: string
}

const OnViewScoreCard = (id: string) => {
    Router.push("/scorecard/"+id);
}
const OnViewRatings = (id: string) => {
    Router.push("/viewrating/" + id);
}
const OnGiveRating = (id: string) => {
    Router.push("/dovote/" + id);
}

export const MatchBriefCard = (props: MatchBriefCardProps) => {
    const {match, ...rest} = props;
    const team1 = match.teams[0];
    const team2 = match.teams[1];

    return (<Box
      p="5px"
      borderRadius="lg"
      w="100%"
      bg={theme.colors.color2}
      boxShadow="dark-lg"
      {...rest}
      key={match.id}
    >
      <Flex direction="column">
        <Flex direction="row">
          <MatchInfo team1={team1.name} team2={team2.name} result={match.result} mathDate={match.date} />
          <Spacer/>
          <IconButtonWithTooltip id={match.id} onClick={OnViewScoreCard} toolTip="View the match scorecard" icon={<AiFillFund />} />
        </Flex>
        <Center h="30px">
          <Box borderTopColor={theme.colors.color1} borderTopStyle="solid" borderTopWidth="1px" w="50%"></Box>
        </Center>
        <Flex direction="row" justifyContent="space-between">
            <TeamScoreDisplay isWon={!!team1.isWon} team={team1.name} rating={(Math.round(team1.teamRating * 100) / 100) + " / 5 (" + team1.count + ")"}  />
            <TeamScoreDisplay isWon={!!team2.isWon} team={team2.name} rating={(Math.round(team2.teamRating * 100) / 100) + " / 5(" + team2.count + ")"}  />
            <IconButtonWithTooltip id={match.id} onClick={OnViewRatings} toolTip="View details of the match rating" icon={<AiFillEye />} />
            <IconButtonWithTooltip id={match.id} onClick={OnGiveRating} toolTip="Submit your rating for the match" icon={<AiFillFileAdd />} />
        </Flex>
      </Flex>
    </Box>
)
}
