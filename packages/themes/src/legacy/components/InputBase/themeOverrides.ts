import type { Components, Theme } from '@mui/material'
import { inputBaseClasses, outlinedInputClasses } from '@mui/material'

export const MonorailInputBaseOverrides: Components<Theme>['MuiInputBase'] = {
  defaultProps: {},
  styleOverrides: {
    root: ({ ownerState: { color = 'primary' }, theme }) => {
      return {
        [`&.${inputBaseClasses.focused}`]: {
          boxShadow: `0 0 0 3px ${theme.palette[color].focusRing.outer}`,
          [`& > fieldset.${outlinedInputClasses.notchedOutline}`]: {
            borderColor: `${theme.palette[color].focusRing.inner}`,
            borderWidth: '1px',
          },
        },
        minHeight: theme.spacing(8),
        ...theme.typography.inputText,
      }
    },
    sizeSmall: ({ theme }) => ({
      minHeight: theme.spacing(6),
    }),
    error: ({ theme }) => ({
      [`&.${inputBaseClasses.focused}`]: {
        boxShadow: `0 0 0 3px ${theme.palette.error.focusRing.outer}`,
        [`& > fieldset.${outlinedInputClasses.notchedOutline}`]: {
          borderColor: `${theme.palette.error.focusRing.inner}`,
          borderWidth: '1px',
        },
      },
    }),
  },
}
