// Edit this file to add new stories
import React from 'react'

import { story } from '../../../__tests__/helpers/storybook'
import { Checkbox } from '../../Checkbox/Checkbox'
import { FormControlLabel } from '../../FormControlLabel/FormControlLabel'
import { FormGroup } from '../../FormGroup/FormGroup'
import { FormLabel } from '../../FormLabel/FormLabel'
import { FormControl, FormControlProps } from '../FormControl'
import { defaultStoryMeta } from './FormControl.stories.gen'
/**
 * Metadata for FormControl stories - update/extend as needed
 */
export default { ...defaultStoryMeta, title: 'Inputs/FormControl' }

const Template = story<FormControlProps>(
  args => (
    <FormControl {...args}>
      <FormLabel component="legend">Pick two</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox name="gilad" />}
          label="Gilad Gray"
        />
        <FormControlLabel
          control={<Checkbox name="jason" />}
          label="Jason Killian"
        />
        <FormControlLabel
          control={<Checkbox name="antoine" />}
          label="Antoine Llorca"
        />
      </FormGroup>
    </FormControl>
  ),
  {
    args: {
      required: true,
      error: true,
      // component: "fieldset", TODO: default prop type is removing this from prop options!
      variant: 'standard',
    },
    parameters: {
      docs: {
        description: {
          component: `Provides context such as filled/focused/error/required for form inputs. Relying on the context provides high flexibility and ensures that the state always stays consistent across the children of the FormControl. This context is used by the following components:

- FormLabel
- FormHelperText
- Input
- InputLabel `,
        },
      },
    },
  },
)
export const Default = story(Template)
