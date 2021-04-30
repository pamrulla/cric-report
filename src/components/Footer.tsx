import { Flex, FlexProps, Text, Link } from '@chakra-ui/react'

export const Footer = (props: FlexProps) => (
  <Flex as="footer" {...props} pt="50px" direction="column" w="100%" position="relative">
    <Text w="100%" textAlign="center">Made by <Link href="https://amrulla.com" target="_blank"><Text as="u">Patan Amrulla Khan</Text></Link></Text>
  </Flex>
)
