// Edit this file to add new stories
import React from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import CheckIcon from '@mui/icons-material/Check'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'
import { styled } from '@mui/material'

import type { ToggleButtonGroupProps } from '@monorail/components'
import {
  Divider,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@monorail/components'

import { story } from '../helpers/storybook.js'

/**
 * Metadata for ToggleButtonGroup stories - update/extend as needed
 */
export default {
  title: 'Inputs/ToggleButton',
  component: ToggleButton,
}
/**
 * Story template (edit/remove by hand if needed)
 *
 * Note: there should be at least one "Default" story that uses this template with the "story" function.
 * The Template and "story" function allow the story to be setup so that it works with the Controls addon and docgen
 */
const Template = story<ToggleButtonGroupProps>(
  args => {
    const [alignment, setAlignment] = React.useState<string | null>('left')

    const handleAlignment = (
      _event: React.MouseEvent<HTMLElement>,
      newAlignment: string | null,
    ) => {
      setAlignment(newAlignment)
    }

    return (
      <ToggleButtonGroup
        value={alignment}
        exclusive
        aria-label="text alignment"
        {...args}
        onChange={handleAlignment}
      >
        <ToggleButton value="left" aria-label="left aligned">
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton value="center" aria-label="centered">
          <FormatAlignCenterIcon />
        </ToggleButton>
        <ToggleButton value="right" aria-label="right aligned">
          <FormatAlignRightIcon />
        </ToggleButton>
        <ToggleButton value="justify" aria-label="justified" disabled>
          <FormatAlignJustifyIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    )
  },
  { args: {}, muiName: 'MuiToggleButton' },
)
/** Default story for ToggleButtonGroup (edit/remove by hand if needed) */
export const Default = story(Template)

export const MultipleSelection = story(
  () => {
    const [formats, setFormats] = React.useState(() => ['bold', 'italic'])

    const handleFormat = (
      event: React.MouseEvent<HTMLElement>,
      newFormats: Array<string>,
    ) => {
      setFormats(newFormats)
    }

    return (
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
      >
        <ToggleButton value="bold" aria-label="bold">
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton value="italic" aria-label="italic">
          <FormatItalicIcon />
        </ToggleButton>
        <ToggleButton value="underlined" aria-label="underlined">
          <FormatUnderlinedIcon />
        </ToggleButton>
        <ToggleButton value="color" aria-label="color" disabled>
          <FormatColorFillIcon />
          <ArrowDropDownIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    )
  },
  {
    args: { exclusive: false },
    parameters: {
      docs: {
        description: {
          story: `Multiple selection allows for logically-grouped options, like bold, italic, and underline, to have multiple options selected. Simply do not use the "exclusive" prop.`,
        },
      },
    },
  },
)

export const Size = story(
  () => {
    const [alignment, setAlignment] = React.useState('left')

    const handleChange = (
      _event: React.MouseEvent<HTMLElement>,
      newAlignment: string,
    ) => {
      setAlignment(newAlignment)
    }

    const children = [
      <ToggleButton value="left" key="left" aria-label="left">
        <FormatAlignLeftIcon fontSize="small" />
      </ToggleButton>,
      <ToggleButton value="center" key="center" aria-label="center">
        <FormatAlignCenterIcon fontSize="small" />
      </ToggleButton>,
      <ToggleButton value="right" key="right" aria-label="right">
        <FormatAlignRightIcon fontSize="small" />
      </ToggleButton>,
      <ToggleButton value="justify" key="justify" aria-label="justify">
        <FormatAlignJustifyIcon fontSize="small" />
      </ToggleButton>,
    ]

    const control = {
      value: alignment,
      onChange: handleChange,
      exclusive: true,
    }

    return (
      <Stack spacing={2} alignItems={'center'}>
        <ToggleButtonGroup size="small" {...control}>
          {children}
        </ToggleButtonGroup>
        <ToggleButtonGroup {...control}>{children}</ToggleButtonGroup>
        <ToggleButtonGroup size="large" {...control}>
          {children}
        </ToggleButtonGroup>
      </Stack>
    )
  },
  {
    args: { exclusive: false },
    parameters: {
      docs: {
        description: {
          story: `For larger or smaller buttons, use the size prop.`,
        },
      },
    },
  },
)

export const Color = story(() => {
  const [alignment, setAlignment] = React.useState('web')

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment)
  }

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="web">Web</ToggleButton>
      <ToggleButton value="android">Android</ToggleButton>
      <ToggleButton value="ios">iOS</ToggleButton>
    </ToggleButtonGroup>
  )
})

export const Vertical = story(
  () => {
    const [view, setView] = React.useState('list')

    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      nextView: string,
    ) => {
      setView(nextView)
    }

    return (
      <ToggleButtonGroup
        orientation="vertical"
        value={view}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="list" aria-label="list">
          <ViewListIcon />
        </ToggleButton>
        <ToggleButton value="module" aria-label="module">
          <ViewModuleIcon />
        </ToggleButton>
        <ToggleButton value="quilt" aria-label="quilt">
          <ViewQuiltIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    )
  },
  {
    parameters: {
      docs: {
        description: {
          story: `The buttons can be stacked vertically with the orientation prop set to "vertical".`,
        },
      },
    },
  },
)

export const StandaloneToggleButton = story(() => {
  const [selected, setSelected] = React.useState(false)

  return (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected)
      }}
    >
      <CheckIcon />
    </ToggleButton>
  )
})

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(1),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))

export const CustomizedDividers = story(() => {
  const [alignment, setAlignment] = React.useState('left')
  const [formats, setFormats] = React.useState(() => ['italic'])

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: Array<string>,
  ) => {
    setFormats(newFormats)
  }

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment)
  }

  return (
    <div>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          border: theme => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned">
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered">
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned">
            <FormatAlignRightIcon />
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified" disabled>
            <FormatAlignJustifyIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <StyledToggleButtonGroup
          size="small"
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="bold" aria-label="bold">
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic">
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton value="underlined" aria-label="underlined">
            <FormatUnderlinedIcon />
          </ToggleButton>
          <ToggleButton value="color" aria-label="color" disabled>
            <FormatColorFillIcon />
            <ArrowDropDownIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  )
})
