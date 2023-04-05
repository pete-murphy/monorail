import type { Components, CSSInterpolation, Theme } from '@mui/material'
import { chipClasses, darken, getContrastRatio } from '@mui/material'

export const MonorailChipOverrides: Components<Theme>['MuiChip'] = {
  defaultProps: {
    variant: 'muted',
  },
  styleOverrides: {
    root: ({
      ownerState: { clickable = false, color = 'default', variant = 'muted' },
      theme,
    }) => {
      const mutedVariantStyles: CSSInterpolation = {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.default.lowEmphasis.light,
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: theme.palette.default.lowEmphasis.light,
          boxShadow: `0 0 0 3px ${theme.palette.default.focusRing.outer}`,
          border: `1px solid ${theme.palette.default.focusRing.inner}`,
        },
      }

      const readOnlyRectangularStyles: CSSInterpolation = {
        borderRadius: 4,
        ...mutedVariantStyles,
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
        ...(variant === 'muted' && mutedVariantStyles),
        ...(variant === 'rectangular' && readOnlyRectangularStyles),
        ...(variant === 'rectangular' &&
          clickable &&
          clickableRectangularStyles),
      }
    },
    label: ({ theme }) => ({
      ...theme.typography.chip,
      // If no label is provided and there is an icon, hide the label
      // .MuiChip-icon + .MuiChip-label
      // Handle sizes too
      // [`&.${chipClasses.label}`]: {
      //   display: 'none',
      // },
    }),
    filled: ({ ownerState: { color = 'default' }, theme }) => {
      const background = theme.palette[color].main
      return {
        color: theme.palette.getContrastText(background),
        backgroundColor: background,
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: background,
        },
      }
    },
    outlined: ({ ownerState: { color = 'default' }, theme }) => {
      return {
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette[color].border.main,
        color:
          color === 'warning'
            ? theme.palette.warning.lowEmphasis.contrastText
            : theme.palette[color].main,
        [`&.${chipClasses.focusVisible}`]: {
          backgroundColor: theme.palette.background.paper,
        },
      }
    },
    clickable: ({
      ownerState: { color = 'default', variant = 'muted' },
      theme,
    }) => {
      const mutedVariantStyles: CSSInterpolation = {
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
        backgroundColor: theme.palette.info.lowEmphasis.main,
        '&:hover': {
          backgroundColor: darken(
            theme.palette.info.lowEmphasis.main,
            theme.palette.action.hoverOpacity,
          ),
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: darken(
            theme.palette.info.lowEmphasis.main,
            theme.palette.action.activatedOpacity,
          ),
        },
        [`& > .${chipClasses.deleteIcon}`]: {
          color: theme.palette.info.lowEmphasis.contrastText,
        },
        [`& > .${chipClasses.icon}`]: {
          color: theme.palette.info.lowEmphasis.contrastText,
        },
      }

      return {
        ...(variant === 'muted' && mutedVariantStyles),
        ...(variant === 'filled' && filledVariantStyles),
        ...(variant === 'outlined' && outlinedVariantStyles),
        ...(variant === 'rectangular' && clickableRectangularStyles),
      }
    },
    sizeSmall: ({ theme }) => ({
      padding: theme.spacing(0.5, 1.25),
    }),
    icon: ({
      ownerState: { variant = 'muted', size = 'medium', label },
      theme,
    }) => {
      const iconOnlyStyles: CSSInterpolation = {
        // Hide the label if only an icon is provided
        marginLeft: theme.spacing(0.75),
        marginRight: theme.spacing(0.75),
        ...(size === 'small' && {
          marginLeft: theme.spacing(-0.5),
          marginRight: theme.spacing(-0.5),
        }),
        [`& + .${chipClasses.label}`]: {
          display: 'none',
        },
      }

      return {
        color: 'inherit',
        marginLeft:
          variant === 'rectangular' ? theme.spacing(1) : theme.spacing(2),
        marginRight: theme.spacing(-2),
        ...(size === 'small' && {
          marginLeft: 0,
          marginRight: theme.spacing(-1),
          fontSize: theme.typography.pxToRem(16),
        }),
        ...(label === undefined && iconOnlyStyles),
      }
    },
    deleteIcon: ({
      ownerState: { clickable = false, color = 'default', variant = 'muted' },
      theme,
    }) => {
      const mutedVariantStyles: CSSInterpolation = {
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

      const readOnlyRectangularStyles: CSSInterpolation = mutedVariantStyles

      const clickableRectangularStyles: CSSInterpolation = {
        color: theme.palette.primary.lowEmphasis.contrastText,
        '&:hover': {
          color: theme.palette.primary.lowEmphasis.contrastText,
        },
      }

      return {
        marginRight: 3,
        ...(variant === 'muted' && mutedVariantStyles),
        ...(variant === 'filled' && filledStyles),
        ...(variant === 'outlined' && outlinedStyles),
        ...(variant === 'rectangular' && readOnlyRectangularStyles),
        ...(variant === 'rectangular' &&
          clickable &&
          clickableRectangularStyles),
      }
    },
    avatar: ({
      ownerState: { clickable = false, color = 'default', variant = 'muted' },
      theme,
    }) => {
      const mutedVariantStyles: CSSInterpolation = {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.default.lowEmphasis.dark,
      }

      const filledVariantStyles: CSSInterpolation = {
        color: theme.palette.getContrastText(
          theme.palette[color].lowEmphasis.contrastText,
        ),
        backgroundColor: theme.palette[color].lowEmphasis.contrastText,
      }

      const outlinedVariantStyles: CSSInterpolation = {
        color: theme.palette.getContrastText(
          theme.palette[color].lowEmphasis.contrastText,
        ),
        backgroundColor: theme.palette[color].lowEmphasis.contrastText,
      }

      const readOnlyRectangularStyles: CSSInterpolation = mutedVariantStyles

      const clickableRectangularStyles: CSSInterpolation = {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.lowEmphasis.dark,
      }

      return {
        marginLeft: 4,
        ...(variant === 'muted' && mutedVariantStyles),
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
