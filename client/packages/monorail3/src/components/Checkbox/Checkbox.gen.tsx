// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUICheckbox,
  CheckboxProps as MUICheckboxProps,
} from '@mui/material/Checkbox'

/**
 * Props for Checkbox
 */
export type CheckboxProps = MUICheckboxProps & {
  ref?: React.ForwardedRef<unknown>
}

/**
 * Checkbox
 */
export const Checkbox = React.forwardRef((props, ref) => (
  <MUICheckbox ref={ref} {...props} />
)) as (props: CheckboxProps) => JSX.Element
