// eslint-disable-next-line no-restricted-imports
import type {} from '@mui/lab/themeAugmentation'
import { Theme, ThemeOptions } from '@mui/material'

import { MonorailAvatarOverrides } from '../components/Avatar/themeOverrides'
import { MonorailBadgeOverrides } from '../components/Badge/themeOverrides'
import { MonorailBreadcrumbsOverrides } from '../components/Breadcrumbs/themeOverrides'
import {
  MonorailButtonOverrides,
  MonorailLoadingButtonOverrides,
} from '../components/Button/themeOverrides'
import { MonorailButtonGroupOverrides } from '../components/ButtonGroup/themeOverrides'
import { MonorailChipOverrides } from '../components/Chip/themeOverrides'
import { MonorailFormControlOverrides } from '../components/FormControl/themeOverrides'
import { MonorailFormHelperTextOverrides } from '../components/FormHelperText/themeOverrides'
import { MonorailIconButtonOverrides } from '../components/IconButton/themeOverrides'
import { MonorailInputBaseOverrides } from '../components/InputBase/themeOverrides'
import { MonorailInputLabelOverrides } from '../components/InputLabel/themeOverrides'
import { MonorailOutlinedInputOverrides } from '../components/OutlinedInput/themeOverrides'
import { MonorailRatingOverrides } from '../components/Rating/themeOverrides'
import { MonorailSkeletonOverrides } from '../components/Skeleton/themeOverrides'
import { MonorailSvgIconOverrides } from '../components/SvgIcon/themeOverrides'
import { MonorailTextFieldOverrides } from '../components/TextField/themeOverrides'
import { baseTheme } from './baseTheme'

/**
 * Constructs the `components` overrides using a subset of the overall theme that includes everything except `components`
 */
export const getThemeComponents = (
  _theme: Theme,
): ThemeOptions['components'] => ({
  // Make sure we apply the defaults here
  ...baseTheme.components,

  MuiAccordion: {
    defaultProps: {
      variant: 'outlined',
      square: true,
    },
  },
  MuiAvatar: MonorailAvatarOverrides,
  MuiBadge: MonorailBadgeOverrides,
  MuiButton: MonorailButtonOverrides,
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiButtonGroup: MonorailButtonGroupOverrides,
  MuiBreadcrumbs: MonorailBreadcrumbsOverrides,
  MuiChip: MonorailChipOverrides,
  MuiFormControl: MonorailFormControlOverrides,
  MuiFormHelperText: MonorailFormHelperTextOverrides,
  MuiIconButton: MonorailIconButtonOverrides,
  MuiInputBase: MonorailInputBaseOverrides,
  MuiInputLabel: MonorailInputLabelOverrides,
  MuiLoadingButton: MonorailLoadingButtonOverrides,
  MuiOutlinedInput: MonorailOutlinedInputOverrides,
  MuiRating: MonorailRatingOverrides,
  MuiSkeleton: MonorailSkeletonOverrides,
  MuiSvgIcon: MonorailSvgIconOverrides,
  MuiTextField: MonorailTextFieldOverrides,
})
