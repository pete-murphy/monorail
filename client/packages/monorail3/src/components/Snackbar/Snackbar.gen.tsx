// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUISnackbar,
  SnackbarProps as MUISnackbarProps,
} from '@material-ui/core/Snackbar'

/**
 * Props for Snackbar
 */
export type SnackbarProps = MUISnackbarProps & {
  ref?: React.ForwardedRef<unknown>
}

/**
 * Snackbar
 */
export const Snackbar = React.forwardRef((props, ref) => (
  <MUISnackbar ref={ref} {...props} />
)) as (props: SnackbarProps) => JSX.Element
