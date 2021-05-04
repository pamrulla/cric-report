import { Box, Flex, Heading, IconButton } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { AiFillHome } from 'react-icons/ai'
import theme from '../theme'

export const Hero = ({ title, isHome = false }: { title: string, isHome?: boolean }) => {
  const router = useRouter();
  
  const onHome = () => {
    router.replace("/");
  }

  return (
    <Flex
      direction="row"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      color={theme.colors.color3}
      py="10px"
    >
      <Box flex="1" textAlign="center" >
        <Heading>{title}</Heading>
      </Box>
      {
        isHome ? <></> :
        <Box position="absolute" right={0} top={0}>
          <IconButton variant="ghost" fontSize="30px" aria-label="back" icon={<AiFillHome />} onClick={onHome}></IconButton>
        </Box>
      }      
    </Flex>
  );
  }

Hero.defaultProps = {
  title: 'Cric Report',
}
