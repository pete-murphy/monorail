// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUIBadge,
  BadgeProps as MUIBadgeProps,
  BadgeTypeMap,
} from '@material-ui/core/Badge'

/**
 * Props for Badge
 */
export type BadgeProps<
  D extends React.ElementType = BadgeTypeMap['defaultComponent'],
  P = {}
> = MUIBadgeProps<D, P> & { ref?: React.ForwardedRef<HTMLSpanElement> }

/**
 * Badge
 */
export const Badge = React.forwardRef((props, ref) => (
  <MUIBadge ref={ref} {...props} />
)) as <D extends React.ElementType = BadgeTypeMap['defaultComponent'], P = {}>(
  props: BadgeProps<D, P>,
) => JSX.Element
