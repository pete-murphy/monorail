// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  BreadcrumbsProps as MUIBreadcrumbsProps,
  BreadcrumbsTypeMap,
  default as MUIBreadcrumbs,
} from '@mui/material/Breadcrumbs'

/**
 * Props for Breadcrumbs
 */
export type BreadcrumbsProps<
  D extends React.ElementType = BreadcrumbsTypeMap['defaultComponent'],
  P = {},
> = MUIBreadcrumbsProps<D, P> & { ref?: React.ForwardedRef<HTMLElement> }

/**
 * Breadcrumbs
 */
export const Breadcrumbs = React.forwardRef((props, ref) => (
  <MUIBreadcrumbs ref={ref} {...props} />
)) as <
  D extends React.ElementType = BreadcrumbsTypeMap['defaultComponent'],
  P = {},
>(
  props: BreadcrumbsProps<D, P>,
) => JSX.Element
