// Edit this file to add new stories
import React from 'react'
import { action } from '@storybook/addon-actions'

import { MobileDatePicker, MobileDatePickerProps, TextField } from '../../..'
import { story } from '../../../test-helpers/storybook'

export default {
  title: 'Inputs/Date and Time/Date/MobileDatePicker',
  component: MobileDatePicker,
}

const Template = story<MobileDatePickerProps<Date>>(args => {
  const [value, setValue] = React.useState<Date | null>(
    new Date('2021-01-01T12:34:00.000Z'),
  )

  return (
    <MobileDatePicker
      aria-label="mobile picker"
      value={value}
      renderInput={params => <TextField id="mobile-input" {...params} />}
      onChange={newValue => {
        setValue(newValue)
        action('onChange')
      }}
      {...args}
    />
  )
})

export const Default = story(Template, {
  parameters: {
    docs: {
      description: {
        component: `MobileDatePicker is used when the user is in a mobile browser, based on a media-query check. This component should not likely be used directly.`,
      },
    },
  },
})
