// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUIClockPicker,
  ClockPickerProps as MUIClockPickerProps,
} from '@mui/lab/ClockPicker'

/**
 * Props for ClockPicker
 */
export type ClockPickerProps<TDate> = MUIClockPickerProps<TDate> & {
  ref?: React.ForwardedRef<HTMLDivElement>
}

/**
 * ClockPicker
 */
export const ClockPicker = React.forwardRef((props, ref) => (
  <MUIClockPicker ref={ref} {...props} />
)) as <TDate>(props: ClockPickerProps<TDate>) => JSX.Element
