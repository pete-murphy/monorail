import React from 'react'
import { sx } from '@monorail/utils'
import { styled, useThemeProps } from '@mui/material'

import { Stack } from '../Stack.js'
import { Typography } from '../Typography.js'
import { DEFAULT_SELECTION_FOOTER_LOCALE_TEXT } from './selectionFooterLocaleText.js'
import { SelectionFooterProps } from './selectionFooterProps.js'

export interface SelectionFooterRootProps {
  ownerState: SelectionFooterProps
}

const SelectionFooterRoot = styled('div', {
  name: 'MonorailSelectionFooter',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<SelectionFooterRootProps>(({ ownerState }) =>
  sx(theme => ({
    minHeight: theme.spacing(9.5),
    backgroundColor: theme.palette.default.shades[50],
    padding: theme.spacing(0, 6),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...(ownerState.disableBorder !== true && {
      borderTop: `1px solid ${theme.palette.divider}`,
    }),
  })),
)

export const SelectionFooter = React.forwardRef((inProps, ref) => {
  const props = useThemeProps({
    name: 'MonorailSelectionFooter',
    props: inProps,
  })
  const {
    selectedCount,
    totalCount,
    shownCount,
    localeText = DEFAULT_SELECTION_FOOTER_LOCALE_TEXT,
    ...other
  } = props
  return (
    <SelectionFooterRoot ref={ref} ownerState={props} {...other}>
      <Typography variant="body2">
        {localeText.selected(selectedCount)}
      </Typography>
      <Stack direction="row">
        <Typography variant="body2">{localeText.showing}&nbsp;</Typography>
        <Typography variant="subtitle2">
          {localeText.shownOfTotal(shownCount, totalCount)}
        </Typography>
      </Stack>
    </SelectionFooterRoot>
  )
}) as (props: SelectionFooterProps) => JSX.Element
