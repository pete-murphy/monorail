// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUIAlert,
  AlertProps as MUIAlertProps,
} from '@material-ui/core/Alert'

/**
 * Props for Alert
 */
export type AlertProps = MUIAlertProps & {
  ref?: React.ForwardedRef<HTMLDivElement>
}

/**
 * Alert
 */
export const Alert = React.forwardRef((props, ref) => (
  <MUIAlert ref={ref} {...props} />
)) as (props: AlertProps) => JSX.Element
