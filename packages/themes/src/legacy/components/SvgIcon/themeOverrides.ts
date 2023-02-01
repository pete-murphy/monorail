import type { Components, Theme } from '@mui/material'

export const MonorailSvgIconOverrides: Components<Theme>['MuiSvgIcon'] = {
  defaultProps: {},
  styleOverrides: {
    root: ({ ownerState, theme }) =>
      ownerState.color === 'default' && {
        fill: theme.palette.default.main,
      },
    fontSizeSmall: ({ theme }) => ({
      fontSize: theme.typography.pxToRem(12),
    }),
    fontSizeMedium: ({ theme }) => ({
      fontSize: theme.typography.pxToRem(16),
    }),
    fontSizeLarge: ({ theme }) => ({
      fontSize: theme.typography.pxToRem(24),
    }),
  },
}
