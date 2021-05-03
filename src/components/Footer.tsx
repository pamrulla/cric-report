import { Flex, FlexProps, Text, Link, Heading} from '@chakra-ui/react'

export const Footer = (props: FlexProps) => (
  <Flex as="footer" {...props} pt="50px" direction="column" w="100%" position="relative">
    <Text w="100%" textAlign="center">Made by <Link href="https://amrulla.com" target="_blank"><Text as="u">Patan Amrulla Khan</Text></Link></Text>
    <Flex direction="row" justifyContent="center" alignItems="center">
      <Heading fontSize="sm" fontWeight="extrabold">Front End:</Heading>
      <Text ml="10px"> reactjs, nextjs, graphql, apollo, typescript, chakra-ui</Text>
    </Flex>
    <Flex direction="row" justifyContent="center" alignItems="center">
      <Heading fontSize="sm" fontWeight="extrabold">Back End:</Heading>
      <Text ml="10px"> nodejs, express, grapqhl, mongoose, mongodb</Text>
    </Flex>
    <Flex direction="row" justifyContent="center" alignItems="center">
      <Heading fontSize="sm" fontWeight="extrabold">Cloud:</Heading>
      <Text ml="10px"> cloud mongodb, Cloud Run, Cloud Loadbalancer, Cloud Build, Docker, Cloud VPC</Text>
    </Flex>
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Heading fontSize="sm" fontWeight="extrabold">GitHub:</Heading>
      <Link hreaf="https://github.com/pamrulla/cric-report" target="_blank"><Text as="u">Front End Link</Text></Link>
      <Link hreaf="https://github.com/pamrulla/cric-report-be" target="_blank"><Text as="u">Back End Link</Text></Link>
    </Flex>
  </Flex>
)
