import type { Components, CSSInterpolation, Theme } from '@mui/material'
import { chipClasses, darken, getContrastRatio } from '@mui/material'

export const MonorailChipOverrides: Components<Theme>['MuiChip'] = {
  defaultProps: {
    variant: 'default',
  },
  styleOverrides: {
    root: ({
      ownerState: { clickable = false, color = 'default', variant = 'default' },
      theme,
    }) => {
      const defaultVariantStyles: CSSInterpolation = {
        color: theme.palette.default.dark,
        backgroundColor: theme.palette.default.lowEmphasis.main,
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: theme.palette.default.lowEmphasis.main,
          boxShadow: `0 0 0 3px ${theme.palette.default.focusRing.outer}`,
          border: `1px solid ${theme.palette.default.focusRing.inner}`,
        },
      }

      const readOnlyRectangularStyles: CSSInterpolation = {
        borderRadius: 4,
        ...defaultVariantStyles,
      }

      const clickableRectangularStyles: CSSInterpolation = {
        borderRadius: 4,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.lowEmphasis.main,
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: theme.palette.primary.lowEmphasis.main,
          boxShadow: `0 0 0 3px ${theme.palette.default.focusRing.outer}`,
          border: `1px solid ${theme.palette.default.focusRing.inner}`,
        },
      }

      return {
        border: '1px solid transparent',
        color: theme.palette[color].contrastText,
        fontWeight: theme.typography.fontWeightBold,
        [`&.${chipClasses.focusVisible}`]: {
          boxShadow: `0 0 0 3px ${theme.palette[color].focusRing.outer}`,
          border: `1px solid ${theme.palette[color].focusRing.inner}`,
        },
        ...(variant === 'default' && defaultVariantStyles),
        ...(variant === 'rectangular' && readOnlyRectangularStyles),
        ...(variant === 'rectangular' &&
          clickable &&
          clickableRectangularStyles),
      }
    },
    label: ({ theme }) => ({
      ...theme.typography.chip,
    }),
    filled: ({ ownerState: { color = 'default' }, theme }) => {
      return {
        backgroundColor: theme.palette[color].main,
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: theme.palette[color].main,
        },
      }
    },
    outlined: ({ ownerState: { color = 'default' }, theme }) => {
      return {
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette[color].border.light,
        color: theme.palette[color].lowEmphasis.contrastText,
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: theme.palette.background.paper,
        },
      }
    },
    clickable: ({
      ownerState: { color = 'default', variant = 'default' },
      theme,
    }) => {
      const defaultVariantStyles: CSSInterpolation = {
        '&:hover': {
          backgroundColor: darken(
            theme.palette.default.lowEmphasis.main,
            theme.palette.action.hoverOpacity,
          ),
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: darken(
            theme.palette.default.lowEmphasis.main,
            theme.palette.action.activatedOpacity,
          ),
        },
      }

      const filledVariantStyles: CSSInterpolation = {
        '&:hover': {
          backgroundColor: theme.palette[color].hover,
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: theme.palette[color].active,
        },
      }

      const outlinedVariantStyles: CSSInterpolation = {
        [`&.${chipClasses.clickable}:hover`]: {
          backgroundColor: theme.palette[color].lowEmphasis.hover,
        },
        [`&.${chipClasses.clickable}:active`]: {
          boxShadow: 'none',
          backgroundColor: theme.palette[color].lowEmphasis.active,
        },
      }

      const clickableRectangularStyles: CSSInterpolation = {
        backgroundColor: theme.palette.primary.lowEmphasis.main,
        '&:hover': {
          backgroundColor: darken(
            theme.palette.primary.lowEmphasis.main,
            theme.palette.action.hoverOpacity,
          ),
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: darken(
            theme.palette.primary.lowEmphasis.main,
            theme.palette.action.activatedOpacity,
          ),
        },
        [`& > .${chipClasses.deleteIcon}`]: {
          color: theme.palette.primary.lowEmphasis.contrastText,
        },
        [`& > .${chipClasses.icon}`]: {
          color: theme.palette.primary.lowEmphasis.contrastText,
        },
      }

      return {
        ...(variant === 'default' && defaultVariantStyles),
        ...(variant === 'filled' && filledVariantStyles),
        ...(variant === 'outlined' && outlinedVariantStyles),
        ...(variant === 'rectangular' && clickableRectangularStyles),
      }
    },
    sizeSmall: ({ theme }) => ({
      padding: theme.spacing(0.5, 1.25),
    }),
    icon: ({ ownerState: { variant = 'filled' }, theme }) => ({
      color: 'inherit',
      marginLeft:
        variant === 'rectangular' ? theme.spacing(1) : theme.spacing(2),
      marginRight: theme.spacing(-2),
    }),
    deleteIcon: ({
      ownerState: { clickable = false, color = 'default', variant = 'filled' },
      theme,
    }) => {
      const defaultVariantStyles: CSSInterpolation = {
        color: theme.palette.default.lowEmphasis.contrastText,
        '&:hover': {
          color: theme.palette.default.lowEmphasis.contrastText,
        },
      }

      const filledBackgroundColor = theme.palette[color].main

      const filledDeleteIconColor =
        getContrastRatio(
          theme.palette.default.lowEmphasis.contrastText,
          filledBackgroundColor,
        ) <= theme.palette.contrastThreshold
          ? theme.palette[color].lowEmphasis.light
          : theme.palette[color].lowEmphasis.contrastText

      const filledStyles: CSSInterpolation = {
        '&:hover': {
          color: filledDeleteIconColor,
        },
        color: filledDeleteIconColor,
      }

      const outlinedStyles: CSSInterpolation = {
        color: theme.palette[color].lowEmphasis.contrastText,
        '&:hover': {
          color: theme.palette[color].lowEmphasis.contrastText,
        },
      }

      const readOnlyRectangularStyles: CSSInterpolation = defaultVariantStyles

      const clickableRectangularStyles: CSSInterpolation = {
        color: theme.palette.primary.lowEmphasis.contrastText,
        '&:hover': {
          color: theme.palette.primary.lowEmphasis.contrastText,
        },
      }

      return {
        marginRight: 3,
        ...(variant === 'default' && defaultVariantStyles),
        ...(variant === 'filled' && filledStyles),
        ...(variant === 'outlined' && outlinedStyles),
        ...(variant === 'rectangular' && readOnlyRectangularStyles),
        ...(variant === 'rectangular' &&
          clickable &&
          clickableRectangularStyles),
      }
    },
    avatar: ({
      ownerState: { clickable = false, color = 'default', variant = 'default' },
      theme,
    }) => {
      const defaultVariantStyles: CSSInterpolation = {
        color: theme.palette.default.dark,
        backgroundColor: theme.palette.default.lowEmphasis.dark,
      }

      const filledVariantStyles: CSSInterpolation = {
        color: theme.palette.common.white,
        backgroundColor: theme.palette[color].lowEmphasis.contrastText,
      }

      const outlinedVariantStyles: CSSInterpolation = {
        color: theme.palette.common.white,
        backgroundColor: theme.palette[color].lowEmphasis.contrastText,
      }

      const readOnlyRectangularStyles: CSSInterpolation = defaultVariantStyles

      const clickableRectangularStyles: CSSInterpolation = {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.lowEmphasis.dark,
      }

      return {
        marginLeft: 4,
        ...(variant === 'default' && defaultVariantStyles),
        ...(variant === 'filled' && filledVariantStyles),
        ...(variant === 'outlined' && outlinedVariantStyles),
        ...(variant === 'rectangular' && readOnlyRectangularStyles),
        ...(variant === 'rectangular' &&
          clickable &&
          clickableRectangularStyles),
      }
    },
  },
}
