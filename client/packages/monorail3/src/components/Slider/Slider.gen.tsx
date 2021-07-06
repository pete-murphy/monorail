// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUISlider,
  SliderProps as MUISliderProps,
  SliderTypeMap,
} from '@material-ui/core/Slider'
export type SliderProps<
  D extends React.ElementType = SliderTypeMap['defaultComponent'],
  P = {}
> = MUISliderProps<D, P>
export const Slider = <
  D extends React.ElementType = SliderTypeMap['defaultComponent'],
  P = {}
>(
  props: SliderProps<D, P>,
) => <MUISlider {...props} />
