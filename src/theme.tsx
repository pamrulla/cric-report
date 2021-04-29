import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  colors: {
    color1: '#16132E',
    color2: '#231E46',
    color3: '#A8ABE1',
    color4: '#6946ED',
    color5: '#ffffff',
    wonColor: '#ffc100',
    wonTextColor: '#444',
    lostColor: '#898794',
  },
  fonts,
  breakpoints,
})

export default theme
