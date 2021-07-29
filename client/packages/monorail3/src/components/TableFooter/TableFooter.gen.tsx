// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUITableFooter,
  TableFooterProps as MUITableFooterProps,
  TableFooterTypeMap,
} from '@material-ui/core/TableFooter'

/**
 * Props for TableFooter
 */
export type TableFooterProps<
  D extends React.ElementType = TableFooterTypeMap['defaultComponent'],
  P = {}
> = MUITableFooterProps<D, P> & {
  ref?: React.ForwardedRef<HTMLTableSectionElement>
}

/**
 * TableFooter
 */
export const TableFooter = React.forwardRef((props, ref) => (
  <MUITableFooter ref={ref} {...props} />
)) as <
  D extends React.ElementType = TableFooterTypeMap['defaultComponent'],
  P = {}
>(
  props: TableFooterProps<D, P>,
) => JSX.Element
