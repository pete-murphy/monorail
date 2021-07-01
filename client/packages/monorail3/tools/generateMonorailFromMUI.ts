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

/**
 * Folders in which to organize components in storybook
 */

export type StorybookFolderLayout = { tag: 'layout'; title: string }
export type StorybookFolderInputs = { tag: 'inputs'; title: string }
export type StorybookFolderNavigation = {
  tag: 'navigation'
  title: string
}
export type StorybookFolderSurfaces = { tag: 'surfaces'; title: string }
export type StorybookFolderFeedback = { tag: 'feedback'; title: string }
export type StorybookFolderDataDisplay = {
  tag: 'dataDisplay'
  title: string
}
export type StorybookFolderDataGrid = { tag: 'dataGrid'; title: string }
export type StorybookFolderUtils = { tag: 'utils'; title: string }

export type StorybookFolder =
  | StorybookFolderLayout
  | StorybookFolderInputs
  | StorybookFolderNavigation
  | StorybookFolderSurfaces
  | StorybookFolderFeedback
  | StorybookFolderDataDisplay
  | StorybookFolderDataGrid
  | StorybookFolderUtils

export const storybookFolderLayout: StorybookFolderLayout = {
  tag: 'layout',
  title: 'Layout',
}

export const storybookFolderInputs: StorybookFolderInputs = {
  tag: 'inputs',
  title: 'Inputs',
}

export const storybookFolderNavigation: StorybookFolderNavigation = {
  tag: 'navigation',
  title: 'Navigation',
}

export const storybookFolderSurfaces: StorybookFolderSurfaces = {
  tag: 'surfaces',
  title: 'Surfaces',
}

export const storybookFolderFeedback: StorybookFolderFeedback = {
  tag: 'feedback',
  title: 'Feedback',
}

export const storybookFolderDataDisplay: StorybookFolderDataDisplay = {
  tag: 'dataDisplay',
  title: 'Data Display',
}

export const storybookFolderDataGrid: StorybookFolderDataGrid = {
  tag: 'dataGrid',
  title: 'Data Grid',
}

export const storybookFolderUtils: StorybookFolderUtils = {
  tag: 'utils',
  title: 'Utils',
}

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
  monorailComponentExtraImports?: Array<string>
  storybookFolder: StorybookFolder
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

/**
 * Base organizational "folder" names for components in storybook
 */

// List of all the modules to generate, including extra metadata to help the code gen
const modules: Array<ModuleInfo> = [
  { name: 'Accordion', storybookFolder: storybookFolderSurfaces },
  { name: 'AccordionActions', storybookFolder: storybookFolderSurfaces },
  { name: 'AccordionDetails', storybookFolder: storybookFolderSurfaces },
  {
    name: 'AccordionSummary',
    storybookFolder: storybookFolderSurfaces,
  },
  { name: 'Alert', storybookFolder: storybookFolderFeedback },
  { name: 'AlertTitle', storybookFolder: storybookFolderFeedback },
  { name: 'AppBar', storybookFolder: storybookFolderSurfaces },
  {
    name: 'Autocomplete',
    storybookFolder: storybookFolderInputs,
    monorailComponentExtraImports: [
      `import { ChipTypeMap } from '@material-ui/core/Chip'`,
    ],
  },
  { name: 'Avatar', storybookFolder: storybookFolderDataDisplay },
  { name: 'AvatarGroup', storybookFolder: storybookFolderDataDisplay },
  { name: 'Backdrop', storybookFolder: storybookFolderFeedback },
  { name: 'Badge', storybookFolder: storybookFolderDataDisplay },
  { name: 'BottomNavigation', storybookFolder: storybookFolderNavigation },
  {
    name: 'BottomNavigationAction',
    storybookFolder: storybookFolderNavigation,
    monorailComponentExtraImports: [
      `import { ButtonBaseTypeMap } from '@material-ui/core/ButtonBase'`,
    ],
  },
  { name: 'Box', storybookFolder: storybookFolderLayout },
  { name: 'Breadcrumbs', storybookFolder: storybookFolderNavigation },
  {
    name: 'Button',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'ButtonBase',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'ButtonGroup',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'Card',
    storybookFolder: storybookFolderSurfaces,
  },
  {
    name: 'CardActionArea',
    storybookFolder: storybookFolderSurfaces,
    monorailComponentExtraImports: [
      `import { ButtonBaseTypeMap } from '@material-ui/core/ButtonBase'`,
    ],
  },
  {
    name: 'CardActions',
    storybookFolder: storybookFolderSurfaces,
  },
  {
    name: 'CardContent',
    storybookFolder: storybookFolderSurfaces,
  },
  {
    name: 'CardHeader',
    storybookFolder: storybookFolderSurfaces,
  },
  {
    name: 'CardMedia',
    storybookFolder: storybookFolderSurfaces,
  },
  {
    name: 'Checkbox',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'Chip',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'CircularProgress',
    storybookFolder: storybookFolderFeedback,
  },
  {
    name: 'ClickAwayListener',
    storybookFolder: storybookFolderUtils,
  },
  {
    name: 'Collapse',
    storybookFolder: storybookFolderUtils,
  },
  {
    name: 'Container',
    storybookFolder: storybookFolderLayout,
  },
  {
    name: 'CssBaseline',
    storybookFolder: storybookFolderUtils,
  },
  {
    name: 'Dialog',
    storybookFolder: storybookFolderFeedback,
  },
  {
    name: 'DialogActions',
    storybookFolder: storybookFolderFeedback,
  },
  {
    name: 'DialogContent',
    storybookFolder: storybookFolderFeedback,
  },
  {
    name: 'DialogContentText',
    storybookFolder: storybookFolderFeedback,
  },
  {
    name: 'DialogTitle',
    storybookFolder: storybookFolderFeedback,
  },
  {
    name: 'Divider',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'Drawer',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'Fab',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'Fade',
    storybookFolder: storybookFolderUtils,
  },
  {
    name: 'FilledInput',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'FormControl',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'FormControlLabel',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'FormGroup',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'FormHelperText',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'FormLabel',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'GlobalStyles',
    storybookFolder: storybookFolderUtils,
  },
  {
    name: 'Grid',
    storybookFolder: storybookFolderLayout,
  },
  {
    name: 'Grow',
    storybookFolder: storybookFolderUtils,
  },
  {
    name: 'Hidden',
    storybookFolder: storybookFolderUtils,
  },
  {
    name: 'Icon',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'IconButton',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'ImageList',
    storybookFolder: storybookFolderLayout,
  },
  {
    name: 'ImageListItem',
    storybookFolder: storybookFolderLayout,
  },
  {
    name: 'ImageListItemBar',
    storybookFolder: storybookFolderLayout,
  },
  {
    name: 'Input',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'InputAdornment',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'InputBase',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'InputLabel',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'LinearProgress',
    storybookFolder: storybookFolderFeedback,
  },
  {
    name: 'Link',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'List',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'ListItem',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'ListItemAvatar',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'ListItemButton',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'ListItemIcon',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'ListItemSecondaryAction',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'ListItemText',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'ListSubheader',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'Menu',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'MenuItem',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'MenuList',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'MobileStepper',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'Modal',
    storybookFolder: storybookFolderUtils,
  },
  {
    name: 'NativeSelect',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'NoSsr',
    storybookFolder: storybookFolderUtils,
  },
  {
    name: 'OutlinedInput',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'Pagination',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'Paper',
    storybookFolder: storybookFolderSurfaces,
  },
  {
    name: 'Popover',
    storybookFolder: storybookFolderUtils,
  },
  {
    name: 'Popper',
    storybookFolder: storybookFolderUtils,
  },
  {
    name: 'Portal',
    storybookFolder: storybookFolderUtils,
    muiModuleFileName: 'index.d.ts',
  },
  {
    name: 'Radio',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'RadioGroup',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'Rating',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'ScopedCssBaseline',
    storybookFolder: storybookFolderUtils,
  },
  {
    name: 'Select',
    storybookFolder: storybookFolderInputs,
    muiComponentModifyTypeParametersLhsString: (_lhs: string) =>
      // Select has a type param <T = unknown>, but we need to add the `T extends unknown` constraint to workaround
      // how JSX parses type parameters. This is just hardcoding that for now
      `<T extends unknown = unknown>`,
  },
  {
    name: 'Skeleton',
    storybookFolder: storybookFolderFeedback,
  },
  {
    name: 'Slide',
    storybookFolder: storybookFolderUtils,
  },
  {
    name: 'Slider',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'Snackbar',
    storybookFolder: storybookFolderFeedback,
  },
  {
    name: 'SnackbarContent',
    storybookFolder: storybookFolderFeedback,
  },
  {
    name: 'SpeedDial',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'SpeedDialAction',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'SpeedDialIcon',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'Stack',
    storybookFolder: storybookFolderLayout,
  },
  {
    name: 'Step',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'StepButton',
    storybookFolder: storybookFolderNavigation,
    monorailComponentExtraImports: [
      `import { ButtonBaseTypeMap } from '@material-ui/core'`,
    ],
  },
  {
    name: 'StepConnector',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'StepContent',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'StepIcon',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'StepLabel',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'Stepper',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'SvgIcon',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'SwipeableDrawer',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'Switch',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'Tab',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'TabScrollButton',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'Table',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'TableBody',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'TableCell',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'TableContainer',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'TableFooter',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'TableHead',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'TablePagination',
    storybookFolder: storybookFolderDataDisplay,
    monorailComponentExtraImports: [
      `import { TablePaginationBaseProps } from '@material-ui/core/TablePagination'`,
    ],
  },
  {
    name: 'TableRow',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'TableSortLabel',
    storybookFolder: storybookFolderDataDisplay,
  },
  {
    name: 'Tabs',
    storybookFolder: storybookFolderNavigation,
  },
  {
    name: 'TextField',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'TextareaAutosize',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'ToggleButton',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'ToggleButtonGroup',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'Toolbar',
    storybookFolder: storybookFolderInputs,
  },
  {
    name: 'Tooltip',
    storybookFolder: storybookFolderFeedback,
  },
  {
    name: 'Typography',
    storybookFolder: storybookFolderDataDisplay,
  },
  // Unstable_TrapFocus - not exposing for now
  {
    name: 'Zoom',
    storybookFolder: storybookFolderUtils,
  },
]

// Create the ts-morph project
const project = new Project({})

// Add all the material-ui/core ts files
project.addSourceFilesAtPaths(
  './node_modules/@material-ui/core/**/*{.d.ts,.ts,.tsx}',
)

// Add the monorial3 src files
project.addSourceFilesAtPaths('./src/**/*{.d.ts,.ts,.tsx}')

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
      writer.writeLine("import * as MUI from '@material-ui/core'")
      // Some components reference a type from MUI like `{Component}TypeMap` (e.g. ButtonTypeMap)
      // Write out an import for a *TypeMap, if there seems to be one in the MUI type params.
      // TODO: this is very naive right now - may need to make this more robust
      if (hasTypeMap) {
        writer.writeLine(
          `import { ${muiComponentName}TypeMap } from '@material-ui/core/${muiComponentName}'`,
        )
      }
      // Some components reference other types in their type params, so allow for adding other arbitrary imports.
      // This could be smarter, but trying to keep this simple for now.
      getMonorailComponentExtraImports(module).forEach(extraImport =>
        writer.writeLine(extraImport),
      )
      // Write out Props type alias
      // This is just a simple alias to the MUI props type (including the type params)
      writer.writeLine(
        `export type ${monorailPropsTypeName}${muiPropsTypeParametersLhsString} = MUI.${muiPropsTypeName}${muiPropsTypeParametersRhsString}`,
      )
      // Write out the component wrapper function
      writer.writeLine(
        `export const ${monorailComponentName} = ${muiPropsTypeParametersLhsString}(props: ${monorailPropsTypeName}${muiPropsTypeParametersRhsString}) => (<MUI.${muiComponentName} {...props} />)`,
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
        `export const defaultStoryMeta = { title: '${module.storybookFolder.title}/${monorailComponentName}', component: ${monorailComponentName} }`,
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
