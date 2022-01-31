// Edit this file to add new stories
import React from 'react'
import { FormLabel, FormLabelProps } from '@mui/material'

import { story } from '../../../__tests__/helpers/storybook'
/**
 * Metadata for FormLabel stories - update/extend as needed
 */
export default { title: 'Inputs/FormLabel', component: FormLabel }

const Template = story<FormLabelProps>(
  (args: FormLabelProps) => <FormLabel {...args} />,
  {
    args: { children: "I'm a label!" },
    parameters: {
      docs: {
        description: {
          component:
            'FormLabel is a base component. It is unlikely to ever be used directly. You are likely to want to use FormControlLabel instead',
        },
      },
    },
  },
)
/** Default story for FormLabel (edit/remove by hand if needed) */
export const Default = story(Template)
