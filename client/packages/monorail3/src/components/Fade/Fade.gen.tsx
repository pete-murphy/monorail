// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUIFade,
  FadeProps as MUIFadeProps,
} from '@material-ui/core/Fade'
export type FadeProps = MUIFadeProps & { ref?: React.ForwardedRef<unknown> }
export const Fade = React.forwardRef((props, ref) => (
  <MUIFade ref={ref} {...props} />
)) as (props: FadeProps) => ReturnType<typeof MUIFade>
