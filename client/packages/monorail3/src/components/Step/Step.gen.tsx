// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUIStep,
  StepProps as MUIStepProps,
} from '@mui/material/Step'

/**
 * Props for Step
 */
export type StepProps = MUIStepProps & { ref?: React.ForwardedRef<unknown> }

/**
 * Step
 */
export const Step = React.forwardRef((props, ref) => (
  <MUIStep ref={ref} {...props} />
)) as (props: StepProps) => JSX.Element
