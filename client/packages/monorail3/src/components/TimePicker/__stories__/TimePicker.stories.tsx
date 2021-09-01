// Edit this file to add new stories
import React from 'react'
import frLocale from 'date-fns/locale/fr'
import ruLocale from 'date-fns/locale/ru'
import arSaLocale from 'date-fns/locale/ar-SA'
import enLocale from 'date-fns/locale/en-US'
import { TimePicker, TimePickerProps } from '../TimePicker'
import { story } from '../../../__tests__/helpers/storybook'
import { defaultStoryMeta } from './TimePicker.stories.gen'
import { action } from '@storybook/addon-actions'
import { TextField } from '../../TextField/TextField'
import { StaticTimePicker } from '../../StaticTimePicker/StaticTimePicker'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import { Stack } from '../../Stack/Stack'
import { DesktopTimePicker } from '../../DesktopTimePicker/DesktopTimePicker'
import { MobileTimePicker } from '@material-ui/lab'
import { ToggleButtonGroup } from '../../ToggleButtonGroup/ToggleButtonGroup'
import { ToggleButton } from '../../ToggleButton/ToggleButton'
/**
 * Metadata for TimePicker stories - update/extend as needed
 */
export default {
  ...defaultStoryMeta,
  title: 'Inputs/Date and Time/Time/TimePicker',
}

/**
 * Story template (edit/remove by hand if needed)
 *
 * Note: there should be at least one "Default" story that uses this template with the "story" function.
 * The Template and "story" function allow the story to be setup so that it works with the Controls addon and docgen
 */
const Template = story<TimePickerProps<Date>>(args => {
  const [value, setValue] = React.useState<Date | null>(null)

  return (
    <TimePicker
      label="Basic example"
      value={value}
      onChange={newValue => {
        setValue(newValue)
      }}
      renderInput={params => <TextField {...params} />}
      {...args}
    />
  )
})

/** Default story for TimePicker (edit/remove by hand if needed) */
export const Default = story(Template, {
  parameters: {
    docs: {
      description: {
        component: `TimePicker is a control for choosing a time. The time picker is rendered as a modal dialog on mobile, and a textbox with a popup on desktop.`,
      },
    },
  },
})

export const StaticMode = story<TimePickerProps<Date>>(
  args => {
    const [value, setValue] = React.useState<Date | null>(new Date())

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticTimePicker
          displayStaticWrapperAs="mobile"
          value={value}
          onChange={newValue => {
            setValue(newValue)
          }}
          renderInput={params => <TextField {...params} />}
        />
      </LocalizationProvider>
    )
  },
  {
    parameters: {
      docs: {
        description: {
          story: `It's possible to render any time picker inline. This will enable building custom popover/modal containers.`,
        },
      },
    },
  },
)

export const Responsiveness = story<TimePickerProps<Date>>(
  args => {
    const [value, setValue] = React.useState<Date | null>(
      new Date('2018-01-01T00:00:00.000Z'),
    )

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <MobileTimePicker
            label="For mobile"
            value={value}
            onChange={newValue => {
              setValue(newValue)
            }}
            renderInput={params => <TextField {...params} />}
          />
          <DesktopTimePicker
            label="For desktop"
            value={value}
            onChange={newValue => {
              setValue(newValue)
            }}
            renderInput={params => <TextField {...params} />}
          />
          <TimePicker
            value={value}
            onChange={setValue}
            renderInput={params => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    )
  },
  {
    parameters: {
      docs: {
        description: {
          story: `The time picker component is designed and optimized for the device it runs on.

- The MobileTimePicker component works best for touch devices and small screens.
- The DesktopTimePicker component works best for mouse devices and large screens.

By default, the TimePicker component renders the desktop version if the media query @media (pointer: fine) matches. This can be customized with the desktopModeMediaQuery prop.`,
        },
      },
    },
  },
)

export const FormProps = story<TimePickerProps<Date>>(
  args => {
    const [value, setValue] = React.useState<Date | null>(new Date())

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <TimePicker
            label="disabled"
            disabled
            value={value}
            onChange={newValue => {
              setValue(newValue)
            }}
            renderInput={params => <TextField {...params} />}
          />
          <TimePicker
            label="read-only"
            readOnly
            value={value}
            onChange={newValue => {
              setValue(newValue)
            }}
            renderInput={params => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    )
  },
  {
    parameters: {
      docs: {
        description: {
          story: `The time picker component can be disabled or read-only.`,
        },
      },
    },
  },
)

export const Localization = story<TimePickerProps<Date>>(
  args => {
    const localeMap = {
      en: enLocale,
      fr: frLocale,
      ru: ruLocale,
      ar: arSaLocale,
    }
    const [locale, setLocale] = React.useState<keyof typeof localeMap>('ru')
    const [value, setValue] = React.useState<Date | null>(new Date())

    const selectLocale = (newLocale: any) => {
      setLocale(newLocale)
    }

    return (
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        locale={localeMap[locale]}
      >
        <div>
          <ToggleButtonGroup
            value={locale}
            exclusive
            sx={{ mb: 2, display: 'block' }}
          >
            {Object.keys(localeMap).map(localeItem => (
              <ToggleButton
                key={localeItem}
                value={localeItem}
                onClick={() => selectLocale(localeItem)}
              >
                {localeItem}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <TimePicker
            value={value}
            onChange={newValue => setValue(newValue)}
            renderInput={params => <TextField {...params} />}
          />
        </div>
      </LocalizationProvider>
    )
  },
  {
    parameters: {
      docs: {
        description: {
          story: `Use LocalizationProvider to change the date-engine locale that is used to render the time picker. The time picker will automatically adjust to the locale's time setting, i.e. the 12-hour or 24-hour format. This can be controlled with ampm prop.`,
        },
      },
    },
  },
)

export const TimeValidation = story<TimePickerProps<Date>>(
  args => {
    const [value, setValue] = React.useState<Date | null>(
      new Date('2020-01-01 12:00'),
    )

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <TimePicker
            renderInput={params => <TextField {...params} />}
            value={value}
            label="min/max time"
            onChange={newValue => {
              setValue(newValue)
            }}
            minTime={new Date(0, 0, 0, 8)}
            maxTime={new Date(0, 0, 0, 18, 45)}
          />
          <TimePicker
            renderInput={params => <TextField {...params} />}
            label="Disable odd hours"
            value={value}
            onChange={newValue => {
              setValue(newValue)
            }}
            shouldDisableTime={(timeValue, clockType) => {
              if (clockType === 'hours' && timeValue % 2) {
                return true
              }

              return false
            }}
          />
        </Stack>
      </LocalizationProvider>
    )
  },
  {
    parameters: {
      docs: {
        description: {
          story: `Use minTime and maxTime to control selectable times, or use shouldDisableTime for more control.`,
        },
      },
    },
  },
)

export const Landscape = story<TimePickerProps<Date>>(
  args => {
    const [value, setValue] = React.useState<Date | null>(new Date())

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticTimePicker
          ampm
          orientation="landscape"
          openTo="minutes"
          value={value}
          onChange={newValue => {
            setValue(newValue)
          }}
          renderInput={params => <TextField {...params} />}
        />
      </LocalizationProvider>
    )
  },
  {
    parameters: {
      docs: {
        description: {
          story: `Render the control in landscape mode`,
        },
      },
    },
  },
)

export const Seconds = story<TimePickerProps<Date>>(
  args => {
    const [value, setValue] = React.useState<Date | null>(new Date())

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <TimePicker
            ampm={false}
            openTo="hours"
            views={['hours', 'minutes', 'seconds']}
            inputFormat="HH:mm:ss"
            mask="__:__:__"
            label="With seconds"
            value={value}
            onChange={newValue => {
              setValue(newValue)
            }}
            renderInput={params => <TextField {...params} />}
          />
          <TimePicker
            ampmInClock
            views={['minutes', 'seconds']}
            inputFormat="mm:ss"
            mask="__:__"
            label="Minutes and seconds"
            value={value}
            onChange={newValue => {
              setValue(newValue)
            }}
            renderInput={params => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    )
  },
  {
    parameters: {
      docs: {
        description: {
          story: `The seconds input can be used for selection of a precise time point.`,
        },
      },
    },
  },
)
