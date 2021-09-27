// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUIGlobalStyles,
  GlobalStylesProps as MUIGlobalStylesProps,
} from '@mui/material/GlobalStyles'

/**
 * Props for GlobalStyles
 */
export type GlobalStylesProps = MUIGlobalStylesProps & {
  ref?: React.ForwardedRef<unknown>
}

/**
 * GlobalStyles
 */
export const GlobalStyles = React.forwardRef((props, ref) => (
  <MUIGlobalStyles ref={ref} {...props} />
)) as (props: GlobalStylesProps) => JSX.Element
