import {
    Flex,
    Heading,
    Spacer,
    Square,
  } from '@chakra-ui/react'
  
import theme from '../theme'

interface TeamScoreDisplayProps {
    isWon: boolean,
    team: string,
    rating: string
}

export const TeamScoreDisplay = (props: TeamScoreDisplayProps) => {
    const bgColor = props.isWon ? theme.colors.wonColor : theme.colors.lostColor;
    const color = props.isWon ? theme.colors.wonTextColor : theme.colors.color5;

    return (
        <Square minW="4rem" bg={bgColor} color={color} borderRadius="lg" p="5px">
            <Flex direction="column" justifyContent="center" align="center">
              <Heading fontSize="sm">{props.team}</Heading>
              <Spacer />
              <Heading fontSize="md">{props.rating}</Heading>
            </Flex>  
        </Square>
    );
}
