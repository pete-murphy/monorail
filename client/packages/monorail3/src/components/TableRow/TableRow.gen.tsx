// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUITableRow,
  TableRowProps as MUITableRowProps,
  TableRowTypeMap,
} from '@mui/material/TableRow'

/**
 * Props for TableRow
 */
export type TableRowProps<
  D extends React.ElementType = TableRowTypeMap['defaultComponent'],
  P = {}
> = MUITableRowProps<D, P> & { ref?: React.ForwardedRef<HTMLTableRowElement> }

/**
 * TableRow
 */
export const TableRow = React.forwardRef((props, ref) => (
  <MUITableRow ref={ref} {...props} />
)) as <
  D extends React.ElementType = TableRowTypeMap['defaultComponent'],
  P = {}
>(
  props: TableRowProps<D, P>,
) => JSX.Element
