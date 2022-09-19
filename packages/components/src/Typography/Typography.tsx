import { Typography as MuiTypography } from '@mui/material'

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    data1: true
    data2: true
    data3: true
    monoBody1: true
    monoBody2: true
    h4: false
    h5: false
    h6: false
    alertTitle: true
    avatarInitials: true
    badgeLabel: true
    bottomNavActiveLabel: true
    buttonLarge: true
    buttonMedium: true
    buttonSmall: true
    chip: true
    inputLabel: true
    helperText: true
    inputText: true
    tableHeader: true
    listSubheader: true
    menuItem: true
    menuItemDense: true
    tabActive: true
    tabInactive: true
    tooltip: true
  }
}

/**
 *
 * Demos:
 *
 * - [Typography](https://simspace.gitlab.io/engineering/ux-engineering/monorail/main/storybook/?path=/docs/data-display-typography--default)
 * - [Breadcrumbs (MUI)](https://mui.com/material-ui/react-breadcrumbs/)
 * - [Typography (MUI)](https://mui.com/material-ui/react-typography/)
 *
 * API:
 *
 * - [Typography API](https://mui.com/material-ui/api/typography/)
 */
export const Typography: typeof MuiTypography = MuiTypography

export * from '@mui/material/Typography'
