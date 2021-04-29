import { Flex, FlexProps, Text, Link } from '@chakra-ui/react'

export const Footer = (props: FlexProps) => (
  <Flex as="footer" py="1rem" {...props} >
    <Text>Made by <Link href="https://amrulla.com" target="_blank"><Text as="u">Patan Amrulla Khan</Text></Link></Text>
  </Flex>
)
