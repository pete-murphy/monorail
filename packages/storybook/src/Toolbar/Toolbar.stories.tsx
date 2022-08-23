// Edit this file to add new stories
import React from 'react'
import {
  Button,
  IconButton,
  Toolbar,
  ToolbarProps,
  Typography,
} from '@monorail/components'
import MenuIcon from '@mui/icons-material/Menu'

import { story } from '../helpers/storybook.js'

/**
 * Metadata for Toolbar stories - update/extend as needed
 */
export default { title: 'Inputs/Toolbar', component: Toolbar }
/**
 * Story template (edit/remove by hand if needed)
 *
 * Note: there should be at least one "Default" story that uses this template with the "story" function.
 * The Template and "story" function allow the story to be setup so that it works with the Controls addon and docgen
 */
const Template = story<ToolbarProps>(
  args => (
    <Toolbar {...args} sx={{ backgroundColor: 'accent.dark' }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
        News
      </Typography>
      <Button>Login</Button>
    </Toolbar>
  ),
  { muiName: 'MuiToolbar' },
)

/** Default story for Toolbar (edit/remove by hand if needed) */
export const Default = story(Template)
