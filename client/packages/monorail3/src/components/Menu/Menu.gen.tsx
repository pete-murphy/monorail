// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUIMenu,
  MenuProps as MUIMenuProps,
} from '@material-ui/core/Menu'

/**
 * Props for Menu
 */
export type MenuProps = MUIMenuProps & { ref?: React.ForwardedRef<unknown> }

/**
 * Menu
 */
export const Menu = React.forwardRef((props, ref) => (
  <MUIMenu ref={ref} {...props} />
)) as (props: MenuProps) => JSX.Element
