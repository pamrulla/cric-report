import {
    IconButton,
    Tooltip,
  } from '@chakra-ui/react'
import { JSXElementConstructor, ReactElement } from 'react';
import theme from '../theme'
  
interface IconButtonWithTooltipProps {
    onClick?: (id: string) => void,
    id: string,
    toolTip: string,
    icon: ReactElement<any, string | JSXElementConstructor<any>>
}

export const IconButtonWithTooltip = (props: IconButtonWithTooltipProps) => {
    const onClickFunc = () => {
        if(props.onClick != undefined)
            props.onClick(props.id)
    }

    return (
        <Tooltip hasArrow label={props.toolTip} bg={theme.colors.color4}>
            <IconButton  _hover={{scale: "110%", bg: theme.colors.color6}} onClick={onClickFunc} aria-label={props.toolTip} color={theme.colors.color5}  bg={theme.colors.color4} size="lg" fontSize="30px" icon={props.icon}></IconButton>
        </Tooltip>
    );
}
