import { Flex, FlexProps } from '@chakra-ui/react'
import theme from '../theme'

export const Container = (props: FlexProps) => {
  return (
    <Flex
      px="10px"
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={theme.colors.color1}
      color={theme.colors.color3}
      {...props}
      minH="100vh"
    />
  )
}
