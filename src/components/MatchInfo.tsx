import {
    SimpleGrid,
    Text,
    Box,
    Flex,
    Heading,
  } from '@chakra-ui/react'
  
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import React from 'react';
import theme from '../theme';

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