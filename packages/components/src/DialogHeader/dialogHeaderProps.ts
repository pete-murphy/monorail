import type React from 'react'
import type { Theme } from '@mui/material'
import type { SxProps } from '@mui/system'

import type { StandardElementProps } from '@monorail/types'

import type { TypographyProps } from '../Typography.js'
import type { DialogHeaderClasses } from './dialogHeaderClasses.js'

export interface DialogHeaderProps
  extends StandardElementProps<'div', 'title'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DialogHeaderClasses>
  /**
   * The title displayed in the header
   */
  title: React.ReactChild
  /**
   * The icon to the left of the title
   * @default undefined
   */
  icon?: React.ReactElement
  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps?: {
    /**
     * Props applied to the Typography component
     * @default {}
     */
    typography?: TypographyProps
  }
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>
}
