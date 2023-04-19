import type React from 'react'
import type {
  BackdropProps,
  DrawerProps,
  ModalProps,
  PaperProps,
  SlideProps,
  SxProps,
} from '@mui/material'
import type { Theme } from '@mui/system'

import type { ResizableDrawerClasses } from './resizableDrawerClasses.js'

export interface ResizableDrawerProps
  extends Omit<
    DrawerProps,
    | 'slotProps'
    | 'variant'
    | 'BackdropProps'
    | 'SlideProps'
    | 'PaperProps'
    | 'TransitionComponent'
  > {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ResizableDrawerClasses>
  /**
   * The content of the component.
   */
  children?: React.ReactNode
  variant?: 'temporary' | 'persistent'
  /**
   * The initial size of the drawer, in pixels. This corresponds to width if anchor="left" or anchor="right",
   * or height if anchor="top" or anchor="bottom".
   * @default 240
   */
  initialSize?: number
  /**
   * The maximum size of the drawer, in pixels. This corresponds to width if anchor="left" or anchor="right",
   * or height if anchor="top" or anchor="bottom".
   * @default 600
   */
  maxSize?: number
  /**
   * The minimum size of the drawer, in pixels. This corresponds to width if anchor="left" or anchor="right",
   * or height if anchor="top" or anchor="bottom".
   * @default 60
   */
  minSize?: number
  /**
   * The size of the area around the resize handle that responds to user input, in pixels.
   * @default 12
   */
  dragAreaSize?: number

  slotProps?: {
    paper?: Partial<PaperProps>
    modal?: Partial<ModalProps>
    backdrop?: Partial<BackdropProps>
    slide?: Partial<SlideProps>
  }

  sx?: SxProps<Theme>
}
