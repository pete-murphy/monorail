// Edit this file to add new stories
import React from 'react'
import {
  DesktopDateRangePicker,
  DesktopDateRangePickerProps,
  LocalizationProvider,
} from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DateRange } from '@mui/lab/DateRangePicker/RangeTypes'
import { Box, TextField } from '@mui/material'

import { story } from '../../../__tests__/helpers/storybook'

/**
 * Metadata for DesktopDateRangePicker stories - update/extend as needed
 */
export default {
  title: 'Inputs/Date and Time/Date Range/DesktopDateRangePicker',
  // TODO: not working with stories
  //component: DesktopDateRangePicker,
}

const Template = story<DesktopDateRangePickerProps<Date>>(
  (args: Partial<DesktopDateRangePickerProps<Date>>) => {
    const [value, setValue] = React.useState<DateRange<Date>>([null, null])

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDateRangePicker
          startText="Desktop start"
          value={value}
          onChange={newValue => {
            setValue(newValue)
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField id="start" label="Start" {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField id="end" label="End" {...endProps} />
            </React.Fragment>
          )}
          {...args}
        />
      </LocalizationProvider>
    )
  },
)

/** Default story for DesktopDateRangePicker (edit/remove by hand if needed) */
export const Default = story(Template, {
  parameters: {
    docs: {
      description: {
        component: `DesktopDateRangePicker is for picking a date range on a desktop browser. This should not likely be used directly.`,
      },
    },
  },
})
