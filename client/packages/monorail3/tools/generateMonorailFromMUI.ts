import { Project } from 'ts-morph'

// Compile this script using `yarn tsc` - this puts the output .js file in dist/tools/
// Run this script from the root of monorail3 using `yarn gen`

// This script generates a set of files in monorail3 for a list of MUI components.
// This might include a module for component types/aliases/wrappers, storybook-related files, and tests.
// Note: this script doesn't attempt to format/prettier the file - this is done separately

const codeGenMessage =
  '// WARNING: This file is generated by a script, do not edit'

const consoleLogBanner = (msg: string): void => {
  console.log('-------------------------------------------------')
  console.log(msg)
  console.log('-------------------------------------------------')
}

export type StorybookFolder1 =
  | 'Layout'
  | 'Inputs'
  | 'Navigation'
  | 'Surfaces'
  | 'Feedback'
  | 'Data Display'
  | 'Data Grid'
  | 'Utils'

// Components that have children. This is not a raw `string` just to avoid accidental typos.
export type StorybookFolder2 =
  | 'Accordion'
  | 'Alert'
  | 'BottomNavigation'
  | 'Date and Time'
  | 'Card'
  | 'Dialog'
  | 'Drawer'
  | 'ImageList'
  | 'FormControl'
  | 'Input'
  | 'List'
  | 'Menu'
  | 'SpeedDial'
  | 'Snackbar'
  | 'Stepper'
  | 'Tab'
  | 'Table'
  | 'Timeline'
  | 'Transitions'
  | 'TreeView'

/**
 * Metadata about an MUI module for the purpose of generating code
 */
type ModuleInfo = {
  name: string
  muiModuleFileName?: string
  muiPropsTypeName?: string
  muiComponentName?: string
  // A special function for manipulating the type parameters string for the LHS of a type declaration
  muiComponentModifyTypeParametersLhsString?: (lhs: string) => string
  monorailComponentRefType?: string
  monorailComponentExtraImports?: Array<string>
  // TODO: The MUI lab DateRange components have an issue that I haven't been able to figure out with the component wrapper functions
  // Uncomment the @ts-ignore in the {Component}.gen.tsx file to see the error.
  monorailComponentTSIgnoreComponent?: boolean
  storybookFolder1: StorybookFolder1
  storybookFolder2?: StorybookFolder2
  isLab?: boolean
}

/**
 * Gets the file name of a file in MUI
 */
const getMuiModuleFileName = (module: ModuleInfo): string =>
  module.muiModuleFileName !== undefined
    ? module.muiModuleFileName
    : `${module.name}.d.ts`

/**
 * Gets the name of the Props type for a MUI component
 */
const getMuiPropsTypeName = (module: ModuleInfo): string =>
  module.muiPropsTypeName !== undefined
    ? module.muiPropsTypeName
    : module.name + 'Props'

/**
 * Gets the name of a MUI component function
 */
const getMuiComponentName = (module: ModuleInfo): string =>
  module.muiComponentName !== undefined ? module.muiComponentName : module.name

/**
 * Gets a function to manipulate the type params for the LHS of a type declaration for a component
 */
const getMuiComponentModifyTypeParametersLhsString = (
  module: ModuleInfo,
): ((lhs: string) => string) =>
  module.muiComponentModifyTypeParametersLhsString !== undefined
    ? module.muiComponentModifyTypeParametersLhsString
    : (lhs: string) => lhs

/**
 * Gets the name of the Props type for the Monorail component
 */
const getMonorailPropsTypeName = (module: ModuleInfo): string =>
  `${module.name}Props`

/**
 * Gets the name of a component in Monorail
 */
const getMonorailComponentName = (module: ModuleInfo): string => module.name

/**
 * Gets a list of extra imports to include in the Monorail component wrapper module
 *
 * These are case-by-case imports depending on how the MUI types are encoded for each component.
 */
const getMonorailComponentExtraImports = (module: ModuleInfo): Array<string> =>
  module.monorailComponentExtraImports !== undefined
    ? module.monorailComponentExtraImports
    : []

const getMonorailComponentRefType = (module: ModuleInfo): string =>
  module.monorailComponentRefType !== undefined
    ? module.monorailComponentRefType
    : 'unknown'

/**
 * Base organizational "folder" names for components in storybook
 */

// List of all the modules to generate, including extra metadata to help the code gen
const modules: Array<ModuleInfo> = [
  { name: 'Accordion', storybookFolder1: 'Surfaces' },
  {
    name: 'AccordionActions',
    storybookFolder1: 'Surfaces',
    storybookFolder2: 'Accordion',
  },
  {
    name: 'AccordionDetails',
    storybookFolder1: 'Surfaces',
    storybookFolder2: 'Accordion',
  },
  {
    name: 'AccordionSummary',
    storybookFolder1: 'Surfaces',
    storybookFolder2: 'Accordion',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'Alert',
    storybookFolder1: 'Feedback',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'AlertTitle',
    storybookFolder1: 'Feedback',
    storybookFolder2: 'Alert',
  },
  { name: 'AppBar', storybookFolder1: 'Surfaces' },
  {
    name: 'Autocomplete',
    storybookFolder1: 'Inputs',
    monorailComponentExtraImports: [
      `import { ChipTypeMap } from '@material-ui/core/Chip'`,
    ],
  },
  {
    name: 'Avatar',
    storybookFolder1: 'Data Display',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'AvatarGroup',
    storybookFolder1: 'Data Display',
  },
  { name: 'Backdrop', storybookFolder1: 'Feedback' },
  {
    name: 'Badge',
    storybookFolder1: 'Data Display',
    monorailComponentRefType: 'HTMLSpanElement',
  },
  {
    name: 'BottomNavigation',
    storybookFolder1: 'Navigation',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'BottomNavigationAction',
    storybookFolder1: 'Navigation',
    storybookFolder2: 'BottomNavigation',
    monorailComponentExtraImports: [
      `import { ButtonBaseTypeMap } from '@material-ui/core/ButtonBase'`,
    ],
    monorailComponentRefType: 'HTMLButtonElement',
  },
  {
    name: 'Box',
    storybookFolder1: 'Layout',
  },
  {
    name: 'Breadcrumbs',
    storybookFolder1: 'Navigation',
    monorailComponentRefType: 'HTMLElement',
  },
  {
    name: 'Button',
    storybookFolder1: 'Inputs',
    monorailComponentRefType: 'HTMLButtonElement',
  },
  {
    name: 'ButtonBase',
    storybookFolder1: 'Inputs',
    monorailComponentRefType: 'HTMLButtonElement',
  },
  {
    name: 'ButtonGroup',
    storybookFolder1: 'Inputs',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'CalendarPicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentRefType: 'HTMLDivElement',
    isLab: true,
  },
  {
    name: 'CalendarPickerSkeleton',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    isLab: true,
  },
  {
    name: 'Card',
    storybookFolder1: 'Surfaces',
  },
  {
    name: 'CardActionArea',
    storybookFolder1: 'Surfaces',
    storybookFolder2: 'Card',
    monorailComponentRefType: 'HTMLButtonElement',
    monorailComponentExtraImports: [
      `import { ButtonBaseTypeMap } from '@material-ui/core/ButtonBase'`,
    ],
  },
  {
    name: 'CardActions',
    storybookFolder1: 'Surfaces',
    storybookFolder2: 'Card',
  },
  {
    name: 'CardContent',
    storybookFolder1: 'Surfaces',
    storybookFolder2: 'Card',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'CardHeader',
    storybookFolder1: 'Surfaces',
    storybookFolder2: 'Card',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'CardMedia',
    storybookFolder1: 'Surfaces',
    storybookFolder2: 'Card',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'Checkbox',
    storybookFolder1: 'Inputs',
  },
  {
    name: 'Chip',
    storybookFolder1: 'Data Display',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'CircularProgress',
    storybookFolder1: 'Feedback',
  },
  {
    name: 'ClickAwayListener',
    storybookFolder1: 'Utils',
  },
  {
    name: 'ClockPicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentRefType: 'HTMLDivElement',
    isLab: true,
  },
  {
    name: 'Collapse',
    storybookFolder1: 'Utils',
    storybookFolder2: 'Transitions',
    monorailComponentRefType: 'unknown',
  },
  {
    name: 'Container',
    storybookFolder1: 'Layout',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'CssBaseline',
    storybookFolder1: 'Utils',
  },
  {
    name: 'DatePicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentRefType: 'HTMLDivElement',
    isLab: true,
  },
  {
    name: 'DateRangePicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentRefType: 'HTMLDivElement',
    monorailComponentTSIgnoreComponent: true,
    isLab: true,
  },
  {
    name: 'DateRangePickerDay',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    isLab: true,
  },
  {
    name: 'DateTimePicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentRefType: 'HTMLDivElement',
    isLab: true,
  },
  {
    name: 'DesktopDatePicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentRefType: 'HTMLDivElement',
    isLab: true,
  },
  {
    name: 'DesktopDateRangePicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentTSIgnoreComponent: true,
    isLab: true,
  },
  {
    name: 'DesktopDateTimePicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentRefType: 'HTMLDivElement',
    isLab: true,
  },
  {
    name: 'DesktopTimePicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentRefType: 'HTMLDivElement',
    isLab: true,
  },
  {
    name: 'Dialog',
    storybookFolder1: 'Feedback',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'DialogActions',
    storybookFolder1: 'Feedback',
    storybookFolder2: 'Dialog',
  },
  {
    name: 'DialogContent',
    storybookFolder1: 'Feedback',
    storybookFolder2: 'Dialog',
  },
  {
    name: 'DialogContentText',
    storybookFolder1: 'Feedback',
    storybookFolder2: 'Dialog',
    monorailComponentRefType: 'HTMLElement',
  },
  {
    name: 'DialogTitle',
    storybookFolder1: 'Feedback',
    storybookFolder2: 'Dialog',
  },
  {
    name: 'Divider',
    storybookFolder1: 'Data Display',
    monorailComponentRefType: 'HTMLHRElement',
  },
  {
    name: 'Drawer',
    storybookFolder1: 'Navigation',
  },
  {
    name: 'Fab',
    storybookFolder1: 'Inputs',
    monorailComponentRefType: 'HTMLButtonElement',
  },
  {
    name: 'Fade',
    storybookFolder1: 'Utils',
    storybookFolder2: 'Transitions',
    monorailComponentRefType: 'unknown',
  },
  {
    name: 'FilledInput',
    storybookFolder1: 'Inputs',
  },
  {
    name: 'FormControl',
    storybookFolder1: 'Inputs',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'FormControlLabel',
    storybookFolder1: 'Inputs',
  },
  {
    name: 'FormGroup',
    storybookFolder1: 'Inputs',
  },
  {
    name: 'FormHelperText',
    storybookFolder1: 'Inputs',
    monorailComponentRefType: 'HTMLParagraphElement',
  },
  {
    name: 'FormLabel',
    storybookFolder1: 'Inputs',
    monorailComponentRefType: 'HTMLLabelElement',
  },
  {
    name: 'GlobalStyles',
    storybookFolder1: 'Utils',
  },
  {
    name: 'Grid',
    storybookFolder1: 'Layout',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'Grow',
    storybookFolder1: 'Utils',
    storybookFolder2: 'Transitions',
    monorailComponentRefType: 'unknown',
  },
  {
    name: 'Hidden',
    storybookFolder1: 'Utils',
  },
  {
    name: 'Icon',
    storybookFolder1: 'Data Display',
    monorailComponentRefType: 'HTMLSpanElement',
  },
  {
    name: 'IconButton',
    storybookFolder1: 'Inputs',
    monorailComponentRefType: 'HTMLButtonElement',
  },
  {
    name: 'ImageList',
    storybookFolder1: 'Layout',
    monorailComponentRefType: 'HTMLUListElement',
  },
  {
    name: 'ImageListItem',
    storybookFolder1: 'Layout',
    storybookFolder2: 'ImageList',
    monorailComponentRefType: 'HTMLLIElement',
  },
  {
    name: 'ImageListItemBar',
    storybookFolder1: 'Layout',
    storybookFolder2: 'ImageList',
  },
  {
    name: 'Input',
    storybookFolder1: 'Inputs',
  },
  {
    name: 'InputAdornment',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Input',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'InputBase',
    storybookFolder1: 'Inputs',
  },
  {
    name: 'InputLabel',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Input',
  },
  {
    name: 'LinearProgress',
    storybookFolder1: 'Feedback',
  },
  {
    name: 'Link',
    storybookFolder1: 'Navigation',
  },
  {
    name: 'List',
    storybookFolder1: 'Data Display',
    monorailComponentRefType: 'HTMLUListElement',
  },
  {
    name: 'ListItem',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'List',
    monorailComponentRefType: 'HTMLLIElement',
  },
  {
    name: 'ListItemAvatar',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'List',
  },
  {
    name: 'ListItemButton',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'List',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'ListItemIcon',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'List',
  },
  {
    name: 'ListItemSecondaryAction',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'List',
  },
  {
    name: 'ListItemText',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'List',
  },
  {
    name: 'ListSubheader',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'List',
    monorailComponentRefType: 'HTMLLIElement',
  },
  {
    name: 'Menu',
    storybookFolder1: 'Navigation',
  },
  {
    name: 'MenuItem',
    storybookFolder1: 'Navigation',
    storybookFolder2: 'Menu',
    monorailComponentRefType: 'HTMLLIElement',
  },
  {
    name: 'MenuList',
    storybookFolder1: 'Navigation',
    storybookFolder2: 'Menu',
  },
  {
    name: 'MobileDatePicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentRefType: 'HTMLDivElement',
    isLab: true,
  },
  {
    name: 'MobileDateRangePicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentTSIgnoreComponent: true,
    isLab: true,
  },
  {
    name: 'MobileDateTimePicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentRefType: 'HTMLDivElement',
    isLab: true,
  },
  {
    name: 'MobileStepper',
    storybookFolder1: 'Navigation',
  },
  {
    name: 'Modal',
    storybookFolder1: 'Utils',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'MonthPicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentRefType: 'HTMLDivElement',
    isLab: true,
  },
  {
    name: 'NativeSelect',
    storybookFolder1: 'Inputs',
  },
  {
    name: 'NoSsr',
    storybookFolder1: 'Utils',
  },
  {
    name: 'OutlinedInput',
    storybookFolder1: 'Inputs',
  },
  {
    name: 'Pagination',
    storybookFolder1: 'Navigation',
  },
  {
    name: 'Paper',
    storybookFolder1: 'Surfaces',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'PickersDay',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    isLab: true,
  },
  {
    name: 'Popover',
    storybookFolder1: 'Utils',
  },
  {
    name: 'Popper',
    storybookFolder1: 'Utils',
  },
  {
    name: 'Portal',
    storybookFolder1: 'Utils',
    muiModuleFileName: 'index.d.ts',
  },
  {
    name: 'Radio',
    storybookFolder1: 'Inputs',
  },
  {
    name: 'RadioGroup',
    storybookFolder1: 'Inputs',
    monorailComponentRefType: 'unknown',
  },
  {
    name: 'Rating',
    storybookFolder1: 'Inputs',
  },
  {
    name: 'ScopedCssBaseline',
    storybookFolder1: 'Utils',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'Select',
    storybookFolder1: 'Inputs',
    muiComponentModifyTypeParametersLhsString: (_lhs: string) =>
      // Select has a type param <T = unknown>, but we need to add the `T extends unknown` constraint to workaround
      // how JSX parses type parameters. This is just hardcoding that for now
      `<T extends unknown = unknown>`,
  },
  {
    name: 'Skeleton',
    storybookFolder1: 'Feedback',
    monorailComponentRefType: 'HTMLSpanElement',
  },
  {
    name: 'Slide',
    storybookFolder1: 'Utils',
    storybookFolder2: 'Transitions',
    monorailComponentRefType: 'unknown',
  },
  {
    name: 'Slider',
    storybookFolder1: 'Inputs',
    monorailComponentRefType: 'HTMLSpanElement',
  },
  {
    name: 'Snackbar',
    storybookFolder1: 'Feedback',
  },
  {
    name: 'SnackbarContent',
    storybookFolder1: 'Feedback',
    storybookFolder2: 'Snackbar',
  },
  {
    name: 'SpeedDial',
    storybookFolder1: 'Navigation',
  },
  {
    name: 'SpeedDialAction',
    storybookFolder1: 'Navigation',
    storybookFolder2: 'SpeedDial',
  },
  {
    name: 'SpeedDialIcon',
    storybookFolder1: 'Navigation',
    storybookFolder2: 'SpeedDial',
  },
  {
    name: 'Stack',
    storybookFolder1: 'Layout',
  },
  {
    name: 'StaticDatePicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentRefType: 'HTMLDivElement',
    isLab: true,
  },
  {
    name: 'StaticDateRangePicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentRefType: 'HTMLDivElement',
    monorailComponentTSIgnoreComponent: true,
    isLab: true,
  },
  {
    name: 'StaticDateTimePicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentRefType: 'HTMLDivElement',
    isLab: true,
  },
  {
    name: 'StaticTimePicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentRefType: 'HTMLDivElement',
    isLab: true,
  },
  {
    name: 'Step',
    storybookFolder1: 'Navigation',
    storybookFolder2: 'Stepper',
  },
  {
    name: 'StepButton',
    storybookFolder1: 'Navigation',
    storybookFolder2: 'Stepper',
    monorailComponentExtraImports: [
      `import { ButtonBaseTypeMap } from '@material-ui/core'`,
    ],
    monorailComponentRefType: 'HTMLButtonElement',
  },
  {
    name: 'StepConnector',
    storybookFolder1: 'Navigation',
    storybookFolder2: 'Stepper',
  },
  {
    name: 'StepContent',
    storybookFolder1: 'Navigation',
    storybookFolder2: 'Stepper',
  },
  {
    name: 'StepIcon',
    storybookFolder1: 'Navigation',
    storybookFolder2: 'Stepper',
  },
  {
    name: 'StepLabel',
    storybookFolder1: 'Navigation',
    storybookFolder2: 'Stepper',
  },
  {
    name: 'Stepper',
    storybookFolder1: 'Navigation',
  },
  {
    name: 'SvgIcon',
    storybookFolder1: 'Data Display',
    monorailComponentRefType: 'SVGSVGElement',
  },
  {
    name: 'SwipeableDrawer',
    storybookFolder1: 'Navigation',
    storybookFolder2: 'Drawer',
  },
  {
    name: 'Switch',
    storybookFolder1: 'Inputs',
  },
  {
    name: 'Tab',
    storybookFolder1: 'Navigation',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'TabScrollButton',
    storybookFolder1: 'Navigation',
    storybookFolder2: 'Tab',
  },
  {
    name: 'Table',
    storybookFolder1: 'Data Display',
    monorailComponentRefType: 'HTMLTableElement',
  },
  {
    name: 'TableBody',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'Table',
    monorailComponentRefType: 'HTMLTableSectionElement',
  },
  {
    name: 'TableCell',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'Table',
  },
  {
    name: 'TableContainer',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'Table',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'TableFooter',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'Table',
    monorailComponentRefType: 'HTMLTableSectionElement',
  },
  {
    name: 'TableHead',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'Table',
    monorailComponentRefType: 'HTMLTableSectionElement',
  },
  {
    name: 'TablePagination',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'Table',
    monorailComponentExtraImports: [
      `import { TablePaginationBaseProps } from '@material-ui/core/TablePagination'`,
    ],
  },
  {
    name: 'TableRow',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'Table',
    monorailComponentRefType: 'HTMLTableRowElement',
  },
  {
    name: 'TableSortLabel',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'Table',
    monorailComponentRefType: 'HTMLSpanElement',
  },
  {
    name: 'Tabs',
    storybookFolder1: 'Navigation',
    monorailComponentRefType: 'HTMLButtonElement',
  },
  {
    name: 'TextField',
    storybookFolder1: 'Inputs',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'TextareaAutosize',
    storybookFolder1: 'Inputs',
  },
  {
    name: 'TimePicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    monorailComponentRefType: 'HTMLDivElement',
    isLab: true,
  },
  {
    name: 'Timeline',
    storybookFolder1: 'Data Display',
    monorailComponentRefType: 'HTMLUListElement',
    isLab: true,
  },
  {
    name: 'TimelineConnector',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'Timeline',
    isLab: true,
  },
  {
    name: 'TimelineContent',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'Timeline',
    isLab: true,
  },
  {
    name: 'TimelineDot',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'Timeline',
    isLab: true,
  },
  {
    name: 'TimelineItem',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'Timeline',
    isLab: true,
  },
  {
    name: 'TimelineOppositeContent',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'Timeline',
    isLab: true,
  },
  {
    name: 'TimelineSeparator',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'Timeline',
    isLab: true,
  },
  {
    name: 'ToggleButton',
    storybookFolder1: 'Inputs',
    monorailComponentRefType: 'HTMLButtonElement',
  },
  {
    name: 'ToggleButtonGroup',
    storybookFolder1: 'Inputs',
  },
  {
    name: 'Toolbar',
    storybookFolder1: 'Inputs',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'Tooltip',
    storybookFolder1: 'Feedback',
    monorailComponentRefType: 'HTMLDivElement',
  },
  {
    name: 'TreeItem',
    storybookFolder1: 'Data Display',
    storybookFolder2: 'TreeView',
    isLab: true,
  },
  {
    name: 'TreeView',
    storybookFolder1: 'Data Display',
    isLab: true,
  },
  {
    name: 'Typography',
    storybookFolder1: 'Data Display',
    monorailComponentRefType: 'HTMLSpanElement',
  },
  {
    name: 'Unstable_TrapFocus',
    muiModuleFileName: 'index.d.ts',
    muiPropsTypeName: 'TrapFocusProps',
    storybookFolder1: 'Utils',
  },
  {
    name: 'YearPicker',
    storybookFolder1: 'Inputs',
    storybookFolder2: 'Date and Time',
    isLab: true,
  },
  {
    name: 'Zoom',
    storybookFolder1: 'Utils',
    storybookFolder2: 'Transitions',
    monorailComponentRefType: 'unknown',
  },
]

// Create the ts-morph project
const project = new Project({})

// Add all the material-ui/core, material-ui/lab, and Monorail typescript files
project.addSourceFilesAtPaths([
  './node_modules/@material-ui/core/**/*{.d.ts,.ts,.tsx}',
  './node_modules/@material-ui/lab/**/*{.d.ts,.ts,.tsx}',
  './src/**/*{.d.ts,.ts,.tsx}',
])

//project.resolveSourceFileDependencies()

// Get all the source files to inspect
const sourceFiles = project.getSourceFiles()

console.log('Found source files: ', sourceFiles.length)

modules.forEach(module => {
  consoleLogBanner(`Handling module: ${module.name}`)

  const muiModuleFileName = getMuiModuleFileName(module)

  const muiModuleFilePathSuffix = `${module.name}/${muiModuleFileName}`
  console.log(`Searching for source file: ${muiModuleFilePathSuffix}`)

  // Find the corresponding MUI module
  const sourceFile = sourceFiles.find(sourceFile =>
    sourceFile.getFilePath().endsWith(muiModuleFilePathSuffix),
  )

  if (typeof sourceFile === 'undefined') {
    // Just throw here to bail the script - we have a configuration problem that needs to be fixed
    throw new Error(
      `Failed to find MUI module in target file: ${muiModuleFileName}. Make sure you have a valid module name configured in the gen script, and override the muiModuleFileName for the module if needed.`,
    )
  }

  const muiComponentName = getMuiComponentName(module)

  const muiPropsTypeName = getMuiPropsTypeName(module)

  // Try to find the MUI component props type/interface in the MUI source file
  // We're doing this because we need to preserve the type parameters from the MUI props in our
  // props type alias, and in the component function.
  const muiPropsTypeAliasOrInterface =
    sourceFile.getTypeAlias(muiPropsTypeName) ||
    sourceFile.getInterface(muiPropsTypeName)

  const muiPropsTypeParameters =
    muiPropsTypeAliasOrInterface?.getTypeParameters() || []

  // The Props type parameters for the LHS of a declaration - this includes the type constraints and default types,
  // like <D extends React.ElementType<any> = "button", P = {}>
  const muiPropsTypeParametersLhsString = getMuiComponentModifyTypeParametersLhsString(
    module,
  )(
    muiPropsTypeParameters.length > 0
      ? '<' + muiPropsTypeParameters.map(tp => tp.print()) + '>'
      : '',
  )

  // The Props type parameters for the RHS of a declaration - this is just the type params like <D, P>
  const muiPropsTypeParametersRhsString =
    muiPropsTypeParameters.length > 0
      ? '<' + muiPropsTypeParameters.map(tp => tp.getName()).join(', ') + '>'
      : ''

  const monorailPropsTypeName = getMonorailPropsTypeName(module)
  const monorailComponentName = getMonorailComponentName(module)

  const monorailComponentGenFilePath = `./src/components/${monorailComponentName}/${monorailComponentName}.gen.tsx`
  const monorailComponentFilePath = `./src/components/${monorailComponentName}/${monorailComponentName}.tsx`
  const monorailComponentStoriesGenFilePath = `./src/components/${monorailComponentName}/__stories__/${monorailComponentName}.stories.gen.tsx`
  const monorailComponentStoriesFilePath = `./src/components/${monorailComponentName}/__stories__/${monorailComponentName}.stories.tsx`
  const monorailComponentTestsGenFilePath = `./src/components/${monorailComponentName}/__tests__/${monorailComponentName}.gen.test.tsx`

  // Create the monorial component file with the props type and the component wrapper
  // This is an "always regenerate" file, so should always be over-written
  console.log(`Generating component gen file: ${monorailComponentGenFilePath}`)
  // Naive check to see if the type params reference a *TypeMap type
  const hasTypeMap = muiPropsTypeParametersLhsString.includes(
    `${muiComponentName}TypeMap`,
  )
  project.createSourceFile(
    monorailComponentGenFilePath,
    writer => {
      // Write out code gen warning message
      writer.writeLine(codeGenMessage)
      // Write out imports
      writer.writeLine("import React from 'react'")
      // Some components reference a type from MUI like `{Component}TypeMap` (e.g. ButtonTypeMap)
      // Write out an import for a *TypeMap, if there seems to be one in the MUI type params.
      // TODO: this is very naive right now - may need to make this more robust

      const importFolder = module.isLab === true ? 'lab' : 'core'

      if (hasTypeMap) {
        writer.writeLine(
          `import { default as MUI${muiComponentName}, ${muiPropsTypeName} as MUI${muiPropsTypeName}, ${muiComponentName}TypeMap } from '@material-ui/${importFolder}/${muiComponentName}'`,
        )
      } else {
        writer.writeLine(
          `import { default as MUI${muiComponentName}, ${muiPropsTypeName} as MUI${muiPropsTypeName} } from '@material-ui/${importFolder}/${muiComponentName}'`,
        )
      }
      // Some components reference other types in their type params, so allow for adding other arbitrary imports.
      // This could be smarter, but trying to keep this simple for now.
      getMonorailComponentExtraImports(module).forEach(extraImport =>
        writer.writeLine(extraImport),
      )

      writer.writeLine(``)

      writer.writeLine(`/**`)
      writer.writeLine(` * Props for ${monorailComponentName}`)
      writer.writeLine(` */`)

      // Write out Props type alias
      // This is just a simple alias to the MUI props type (including the type params)
      writer.writeLine(
        `export type ${monorailPropsTypeName}${muiPropsTypeParametersLhsString} = MUI${muiPropsTypeName}${muiPropsTypeParametersRhsString} & { ref?: React.ForwardedRef<${getMonorailComponentRefType(
          module,
        )}> }`,
      )

      writer.writeLine(``)

      writer.writeLine(`/**`)
      writer.writeLine(` * ${monorailComponentName}`)
      writer.writeLine(` */`)

      // Write out the component function wrapped in a `React.forwardRef`. All MUI components can accept a ref.
      writer.writeLine(
        `export const ${monorailComponentName} = React.forwardRef((props, ref) => (`,
      )

      if (module.monorailComponentTSIgnoreComponent === true) {
        writer.writeLine(
          '// TODO: there is an issue with the ref type that needs to be investigated',
        )
        writer.writeLine('// @ts-ignore')
      }
      writer.writeLine(`<MUI${muiComponentName} ref={ref} {...props} />)`)

      writer.writeLine(
        `) as ${muiPropsTypeParametersLhsString}(props: ${monorailPropsTypeName}${muiPropsTypeParametersRhsString}) => JSX.Element`,
      )
    },
    { overwrite: true },
  )

  // Create the '{Component}.tsx' file if it doesn't exist
  // This file is intended to house extra hand-written types/functions/etc. for the component
  // This file is meant to be hand-edited, so should only be generated if it doesn't exist.
  console.log(
    `Generating component file (if needed): ${monorailComponentFilePath}`,
  )
  const componentExtraFile = project.getSourceFile(monorailComponentFilePath)
  if (componentExtraFile === undefined) {
    project.createSourceFile(monorailComponentFilePath, writer => {
      // Just an empty export b/c we need to export something
      writer.writeLine(
        `// Placeholder for extra functionality - add extra types/values/functions/etc. for ${monorailComponentName}`,
      )
      writer.writeLine(`import React from "react"`)
      writer.writeLine(
        `import { ${monorailComponentName} as _${monorailComponentName}, ${monorailPropsTypeName} as _${monorailPropsTypeName} } from './${monorailComponentName}'`,
      )
      // Re-export the generated types/components/etc.
      writer.writeLine(`export * from "./${monorailComponentName}.gen"`)

      writer.writeLine(`// Add more functions/etc. below`)
    })
  }

  // Generate the __stories__/*.stories.gen.tsx file
  // This file is intended to house boilerplate items that we can automatically generate for storybook.
  // Note that it is more involved to generate useful Templates/stories, so this isn't going to attempt that for now -
  // those will be hand-written.
  console.log(
    `Generating stories gen file: ${monorailComponentStoriesGenFilePath}`,
  )
  project.createSourceFile(
    monorailComponentStoriesGenFilePath,
    writer => {
      writer.writeLine(codeGenMessage)
      writer.writeLine("import React from 'react'")
      writer.writeLine(
        `import { story } from '../../../__tests__/helpers/storybook'`,
      )
      writer.writeLine(
        `import { ${monorailComponentName}, ${monorailPropsTypeName} } from '../${monorailComponentName}'`,
      )

      writer.writeLine(
        `/** This is intended to be exported (with possible extensions) as the default meta object for a story */`,
      )
      writer.writeLine(
        `export const defaultStoryMeta = { title: '${module.storybookFolder1}/${
          module.storybookFolder2 !== undefined
            ? `${module.storybookFolder2}/`
            : ''
        }${monorailComponentName}', component: ${monorailComponentName} }`,
      )

      /* Difficult to generate args/template b/c it varies per component, and MUI tends to have runtime issues if the Components aren't rendered in certain ways
        writer.writeLine(
          `export const defaultArgs: ${monorailPropsTypeName} = { children: '${monorailComponentName}' }`,
        )
        writer.writeLine(
          `export const Template = story<${monorailPropsTypeName}>((args) => <${monorailComponentName} {...args}>{defaultArgs.children}</${monorailComponentName}>)`,
        )
        */
    },
    {
      overwrite: true,
    },
  )

  // Create the base `.stories.tsx` file - this is intended to be edited by hand going forward
  console.log(
    `Generating stories file (if needed): ${monorailComponentStoriesFilePath}`,
  )
  const componentStoriesFile = project.getSourceFile(
    monorailComponentStoriesFilePath,
  )
  if (componentStoriesFile === undefined) {
    project.createSourceFile(monorailComponentStoriesFilePath, writer => {
      writer.writeLine(`// Edit this file to add new stories`)
      writer.writeLine(`import React from 'react'`)
      writer.writeLine(
        `import { ${monorailComponentName}, ${monorailPropsTypeName} } from '../${monorailComponentName}'`,
      )
      writer.writeLine(
        `import { story } from '../../../__tests__/helpers/storybook'`,
      )
      writer.writeLine(
        `import { defaultStoryMeta } from './${monorailComponentName}.stories.gen'`,
      )

      writer.writeLine(`/**`)
      writer.writeLine(
        ` * Metadata for ${monorailComponentName} stories - update/extend as needed`,
      )
      writer.writeLine(` */`)
      writer.writeLine(`export default { ...defaultStoryMeta }`)

      // Note: this template may not compile as it is here for all components. This should just be edited as needed.
      writer.writeLine(`/**`)
      writer.writeLine(` * Story template (edit/remove by hand if needed)`)
      writer.writeLine(` *`)
      writer.writeLine(
        ` * Note: there should be at least one "Default" story that uses this template with the "story" function.`,
      )
      writer.writeLine(
        ` * The Template and "story" function allow the story to be setup so that it works with the Controls addon and docgen`,
      )
      writer.writeLine(` */`)
      writer.writeLine(
        `const Template = story<${monorailPropsTypeName}>((args) => <${monorailComponentName} {...args} />, { args: {} })`,
      )

      writer.writeLine(
        `/** Default story for ${monorailComponentName} (edit/remove by hand if needed) */`,
      )
      writer.writeLine(`export const Default = story(Template)`)

      writer.writeLine(`// TODO: add more stories below`)
    })
  }

  // Create the .gen.test.tsx file for generated (a11y) tests
  // Other tests should go in a separate .test.tsx file (which is not generated at this time)
  console.log(`Generating tests gen file: ${monorailComponentTestsGenFilePath}`)
  project.createSourceFile(
    monorailComponentTestsGenFilePath,
    writer => {
      writer.writeLine(codeGenMessage)
      writer.writeLine(
        `import { generateA11yStoryTests } from '../../../__tests__/helpers/a11y'`,
      )
      writer.writeLine(
        `import * as stories from '../__stories__/${monorailComponentName}.stories'`,
      )
      writer.writeLine(`describe('${monorailComponentName} (a11y)', () => {`)
      writer.writeLine(`  generateA11yStoryTests(stories)`)
      writer.writeLine(`})`)

      writer.writeLine(
        `// Other hand-written tests should go in a separate file like "__tests__/${monorailComponentName}.test.tsx"`,
      )
    },
    { overwrite: true },
  )
})

console.log('Saving ts-morph project...')
project.saveSync()

console.log('Done!')
