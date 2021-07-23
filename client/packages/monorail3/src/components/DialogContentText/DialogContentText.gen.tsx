// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUIDialogContentText,
  DialogContentTextProps as MUIDialogContentTextProps,
  DialogContentTextTypeMap,
} from '@material-ui/core/DialogContentText'
export type DialogContentTextProps<
  D extends React.ElementType = DialogContentTextTypeMap['defaultComponent'],
  P = {}
> = MUIDialogContentTextProps<D, P> & { ref?: React.ForwardedRef<HTMLElement> }
export const DialogContentText = React.forwardRef((props, ref) => (
  <MUIDialogContentText ref={ref} {...props} />
)) as <
  D extends React.ElementType = DialogContentTextTypeMap['defaultComponent'],
  P = {}
>(
  props: DialogContentTextProps<D, P>,
) => ReturnType<typeof MUIDialogContentText>
