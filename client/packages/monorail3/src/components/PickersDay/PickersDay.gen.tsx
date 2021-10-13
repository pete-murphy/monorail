// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUIPickersDay,
  PickersDayProps as MUIPickersDayProps,
} from '@mui/lab/PickersDay'

/**
 * Props for PickersDay
 */
export type PickersDayProps<TDate> = MUIPickersDayProps<TDate> & {
  ref?: React.ForwardedRef<HTMLButtonElement>
}

/**
 * PickersDay
 */
export const PickersDay = React.forwardRef((props, ref) => (
  <MUIPickersDay ref={ref} {...props} />
)) as <TDate>(props: PickersDayProps<TDate>) => JSX.Element
