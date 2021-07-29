// WARNING: This file is generated by a script, do not edit
import React from 'react'
import {
  default as MUIListItemAvatar,
  ListItemAvatarProps as MUIListItemAvatarProps,
} from '@material-ui/core/ListItemAvatar'

/**
 * Props for ListItemAvatar
 */
export type ListItemAvatarProps = MUIListItemAvatarProps & {
  ref?: React.ForwardedRef<unknown>
}

/**
 * ListItemAvatar
 */
export const ListItemAvatar = React.forwardRef((props, ref) => (
  <MUIListItemAvatar ref={ref} {...props} />
)) as (props: ListItemAvatarProps) => JSX.Element
