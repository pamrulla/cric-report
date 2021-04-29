import { Flex, Heading, Link } from '@chakra-ui/react'
import theme from '../theme'

export const Hero = ({ title }: { title: string }) => (
  <Flex
    direction="row"
    justifyContent="center"
    alignItems="center"
    width="100vw"
    color={theme.colors.color3}
    py="10px"
  >
    <Heading><Link href="/">{title}</Link></Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'Cric Report',
}
