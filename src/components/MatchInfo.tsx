import {
    Flex,
    Heading,
  } from '@chakra-ui/react'
  
import React from 'react';

interface MatchInfoProps {
    team1: string,
    team2: string,
    result: string,
    mathDate: string,
}

export const MatchInfo = (props: MatchInfoProps) => {

    return (
        <Flex direction="column" minW="60%">
            <Heading fontSize="md">{props.team1} vs {props.team2}</Heading>
            <Heading fontSize="xs">{props.result}</Heading>
            <Heading fontSize="xs">On {props.mathDate}</Heading>
        </Flex>
    );
}