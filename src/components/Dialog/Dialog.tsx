import React from 'react'
import { Dialog as MuiDialog } from '@mui/material'

import { DialogEventContext } from './dialogEventContext'
import { DialogProps } from './dialogProps'

export const Dialog = React.forwardRef(function Dialog(props, ref) {
  const { children, onClose, ...other } = props

  const dialogEventContextValue = React.useMemo(() => ({ onClose }), [onClose])

  return (
    <MuiDialog ref={ref} onClose={onClose} {...other}>
      <DialogEventContext.Provider value={dialogEventContextValue}>
        {children}
      </DialogEventContext.Provider>
    </MuiDialog>
  )
}) as (props: DialogProps) => JSX.Element

export * from '@mui/material/Dialog'
