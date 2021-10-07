// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUIDateRangePickerDay,
  DateRangePickerDayProps as MUIDateRangePickerDayProps,
} from '@mui/lab/DateRangePickerDay'

/**
 * Props for DateRangePickerDay
 */
export type DateRangePickerDayProps<
  TDate
> = MUIDateRangePickerDayProps<TDate> & {
  ref?: React.ForwardedRef<HTMLButtonElement>
}

/**
 * DateRangePickerDay
 */
export const DateRangePickerDay = React.forwardRef((props, ref) => (
  <MUIDateRangePickerDay ref={ref} {...props} />
)) as <TDate>(props: DateRangePickerDayProps<TDate>) => JSX.Element
