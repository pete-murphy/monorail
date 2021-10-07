// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUIStepContent,
  StepContentProps as MUIStepContentProps,
} from '@mui/material/StepContent'

/**
 * Props for StepContent
 */
export type StepContentProps = MUIStepContentProps & {
  ref?: React.ForwardedRef<unknown>
}

/**
 * StepContent
 */
export const StepContent = React.forwardRef((props, ref) => (
  <MUIStepContent ref={ref} {...props} />
)) as (props: StepContentProps) => JSX.Element
