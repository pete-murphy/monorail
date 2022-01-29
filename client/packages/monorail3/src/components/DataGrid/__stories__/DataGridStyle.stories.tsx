// Edit this file to add new stories
import React from 'react'
import { Pagination } from '@mui/material'
import { createTheme, darken, lighten, Theme } from '@mui/material/styles'
import { createStyles, makeStyles } from '@mui/styles'
import {
  DataGrid,
  DataGridProps,
  GridCellParams,
  GridColumns,
  useGridSlotComponentProps,
} from '@mui/x-data-grid'
import { useDemoData } from '@mui/x-data-grid-generator'

import { story } from '../../../__tests__/helpers/storybook'

export default {
  title: 'Data Grid/Style',
  component: DataGrid,
  parameters: {
    creevey: {
      skip: 'Mismatch expected because data gets regenerated by mui/x-data-grid-generator.',
    },
  },
}

const defaultTheme = createTheme()

const columns: GridColumns = [
  {
    field: 'first',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    width: 140,
  },
  {
    field: 'last',
    headerClassName: 'super-app-theme--header',
    headerAlign: 'center',
    width: 140,
  },
]

const rows = [
  {
    id: 1,
    first: 'Jane',
    last: 'Carter',
  },
  {
    id: 2,
    first: 'Jack',
    last: 'Smith',
  },
  {
    id: 3,
    first: 'Gill',
    last: 'Martin',
  },
]

const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
})

const Template = story<DataGridProps>(args => {
  const classes = useStyles()

  return (
    <div style={{ height: 300, width: '100%' }} className={classes.root}>
      <DataGrid {...args} rows={rows} columns={columns} />
    </div>
  )
})

export const Default = story(Template)

Default.parameters = {
  docs: {
    description: {
      component: `The grid CSS can be easily overwritten.

### Styling column headers

The  \`GridColDef\`  type has properties to apply class names and custom CSS on the header.

-   \`headerClassName\`: to apply class names into the column header. It can also be a function, which is called with a  \`GridColumnHeaderParams\`  object.
-   \`headerAlign\`: to align the content of the header. It must be 'left' | 'right' | 'center'.


    const columns: GridColumns = [
      {
        field: 'first',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
      },
      {
        field: 'last',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
      },
    ];

`,
    },
  },
  creevey: {
    skip: 'Mismatch expected because data gets regenerated by mui/x-data-grid-generator.',
  },
}

/**
 * Styling rows
 */
const useStylesStylingRows = makeStyles(
  theme => {
    const getBackgroundColor = (color: string) =>
      theme.palette.mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6)

    const getHoverBackgroundColor = (color: string) =>
      theme.palette.mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5)

    return {
      root: {
        '& .super-app-theme--Open': {
          backgroundColor: getBackgroundColor(theme.palette.info.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(theme.palette.info.main),
          },
        },
        '& .super-app-theme--Filled': {
          backgroundColor: getBackgroundColor(theme.palette.success.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(
              theme.palette.success.main,
            ),
          },
        },
        '& .super-app-theme--PartiallyFilled': {
          backgroundColor: getBackgroundColor(theme.palette.warning.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(
              theme.palette.warning.main,
            ),
          },
        },
        '& .super-app-theme--Rejected': {
          backgroundColor: getBackgroundColor(theme.palette.error.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
          },
        },
      },
    }
  },
  { defaultTheme },
)

export const StylingRowsGrid = story<DataGridProps>(args => {
  const classes = useStylesStylingRows()

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
  })

  return (
    <div style={{ height: 400, width: '100%' }} className={classes.root}>
      <DataGrid
        {...args}
        {...data}
        getRowClassName={params =>
          `super-app-theme--${params.getValue(params.id, 'status')}`
        }
      />
    </div>
  )
})

StylingRowsGrid.storyName = 'Styling rows'
StylingRowsGrid.parameters = {
  docs: {
    description: {
      story: `The  \`getRowClassName\`  prop can be used to apply a custom CSS class on each row. It's called with a  \`GridRowParams\`  object and must return a string.

	
    interface GridRowParams {
      /**
       * The grid row id.
       */
      id: GridRowId;
      /**
       * The row model of the row that the current cell belongs to.
       */
      row: GridRowModel;
      /**
       * All grid columns.
       */
      columns: GridColumns;
      /**
       * GridApiRef that let you manipulate the grid.
       */
      api: any;
      /**
       * Get the cell value of a row and field.
       * @param id
       * @param field
       */
      getValue: (id: GridRowId, field: string) => GridCellValue;
    }
`,
    },
  },
  creevey: {
    skip: 'Mismatch expected because data gets regenerated by mui/x-data-grid-generator.',
  },
}

/**
 * Styling cells using cellClassName
 */
const useStylesStylingCells = makeStyles({
  root: {
    '& .super-app-theme--cell': {
      backgroundColor: 'rgba(224, 183, 60, 0.55)',
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .super-app.negative': {
      backgroundColor: 'rgba(157, 255, 118, 0.49)',
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .super-app.positive': {
      backgroundColor: '#d47483',
      color: '#1a3e72',
      fontWeight: '600',
    },
  },
})

export const StylingCellsGrid = story<DataGridProps>(args => {
  const classes = useStylesStylingCells()

  const columns: GridColumns = [
    {
      field: 'name',
      cellClassName: 'super-app-theme--cell',
    },
    {
      field: 'score',
      type: 'number',
      width: 140,
      cellClassName: (params: GridCellParams) =>
        `super-app ${(params.value as number) < 0 ? 'negative' : ''} ${
          (params.value as number) > 0 ? 'positive' : ''
        }`,
    },
  ]

  const rows = [
    {
      id: 1,
      name: 'Jane',
      score: 100,
    },
    {
      id: 2,
      name: 'Jack',
      score: -100,
    },
    {
      id: 3,
      name: 'Gill',
      score: -50,
    },
  ]

  return (
    <div style={{ height: 300, width: '100%' }} className={classes.root}>
      <DataGrid {...args} rows={rows} columns={columns} />
    </div>
  )
})

StylingCellsGrid.storyName = 'Styling cells using cellClassName'
StylingCellsGrid.parameters = {
  docs: {
    description: {
      story: `There are multiple ways to apply a custom CSS class on a cell.

Using the \`cellClassName\`  property of  \`GridColDef\`:

This property allows to set a CSS class that is applied on every cell of the column it was defined. It can also be a function, which is called with a  \`GridCellParams\`  object.

	
    const columns: GridColumns = [
      {
        field: 'name',
        cellClassName: 'super-app-theme--cell',
      },
      {
        field: 'score',
        type: 'number',
        cellClassName: (params: GridCellParams) =>
          clsx('super-app', {
            negative: (params.value as number) < 0,
            positive: (params.value as number) > 0,
          }),
      },
    ];

`,
    },
  },
  creevey: {
    skip: 'Mismatch expected because data gets regenerated by mui/x-data-grid-generator.',
  },
}

/**
 * Styling cells using getCellClassName
 */
const useStylesStylingAllCells = makeStyles({
  root: {
    '& .cold': {
      backgroundColor: '#b9d5ff91',
      color: '#1a3e72',
    },
    '& .hot': {
      backgroundColor: '#ff943975',
      color: '#1a3e72',
    },
  },
})

export const StylingAllCells = story<DataGridProps>(args => {
  const classes = useStylesStylingAllCells()
  const columns: GridColumns = [
    { field: 'city' },
    {
      field: 'oct',
      type: 'number',
      valueFormatter: ({ value }) => `${value} °C`,
    },
    {
      field: 'nov',
      type: 'number',
      valueFormatter: ({ value }) => `${value} °C`,
    },
    {
      field: 'dec',
      type: 'number',
      valueFormatter: ({ value }) => `${value} °C`,
    },
  ]

  const rows = [
    { id: 1, city: 'Amsterdam', oct: 7.1, nov: 4, dec: 10.2 },
    { id: 2, city: 'Barcelona', oct: 14.9, nov: 12.3, dec: 18.2 },
    { id: 3, city: 'Paris', oct: 8.1, nov: 5.4, dec: 12.3 },
    { id: 4, city: 'São Paulo', oct: 20.2, nov: 21.1, dec: 19.2 },
  ]

  return (
    <div style={{ height: 300, width: '100%' }} className={classes.root}>
      <DataGrid
        {...args}
        rows={rows}
        columns={columns}
        getCellClassName={(params: GridCellParams) => {
          if (params.field === 'city') {
            return ''
          }
          return Number(params.value) >= 15 ? 'hot' : 'cold'
        }}
      />
    </div>
  )
})

StylingAllCells.storyName = 'Styling cells using getCellClassName'
StylingAllCells.parameters = {
  docs: {
    description: {
      story: `Using the  \`getCellClassName\`  prop:

This prop is called for every cell in every column. Different from the first option, this prop is defined at the grid level, not column level. It is also called with a  \`GridCellParams\`  object.`,
    },
  },
}

/**
 * Custom theme
 */
const customCheckbox = (theme: Theme) => {
  return {
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: `1px solid ${
        theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
      }`,
      borderRadius: 2,
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #fff',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714,
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after':
      {
        width: 8,
        height: 8,
        backgroundColor: '#1890ff',
        transform: 'none',
        top: '39%',
        border: 0,
      },
  }
}

const useStylesCustomTheme = makeStyles(
  theme =>
    createStyles({
      root: {
        border: 0,
        color:
          theme.palette.mode === 'light'
            ? 'rgba(0,0,0,.85)'
            : 'rgba(255,255,255,0.85)',
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        WebkitFontSmoothing: 'auto',
        letterSpacing: 'normal',
        '& .MuiDataGrid-columnsContainer': {
          backgroundColor:
            theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
        },
        '& .MuiDataGrid-iconSeparator': {
          display: 'none',
        },
        '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
          borderRight: `1px solid ${
            theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
          }`,
        },
        '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
          borderBottom: `1px solid ${
            theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
          }`,
        },
        '& .MuiDataGrid-cell': {
          color:
            theme.palette.mode === 'light'
              ? 'rgba(0,0,0,.85)'
              : 'rgba(255,255,255,0.65)',
        },
        '& .MuiPaginationItem-root': {
          borderRadius: 0,
        },
        ...customCheckbox(theme),
      },
    }),
  { defaultTheme },
)

const CustomPagination = () => {
  const { state, apiRef } = useGridSlotComponentProps()

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={state.pagination.page}
      count={state.pagination.pageCount}
      // renderItem was causing the table to not render (GS 10/7/21)
      // renderItem={props2 => <PaginationItem {...props2} disableRipple />}
      onChange={(event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value)
      }
    />
  )
}

export const AntDesignGrid = story<DataGridProps>(
  (args: Partial<DataGridProps>) => {
    const { data } = useDemoData({
      dataSet: 'Commodity',
      rowLength: 10,
      maxColumns: 10,
    })
    const classes = useStylesCustomTheme()

    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          {...args}
          className={classes.root}
          checkboxSelection
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{
            Pagination: CustomPagination,
          }}
          {...data}
        />
      </div>
    )
  },
)

AntDesignGrid.storyName = 'Cell alignment'
AntDesignGrid.parameters = {
  docs: {
    description: {
      story: `Use the  \`align\`  property in  \`GridColDef\`  to change the alignment of content of the cells. Choose between one of the following values: 'left' | 'right' | 'center'.

**Note**: You must use  \`headerAlign\`  to align the content of the header.

### Custom theme

The following demo leverages the CSS customization API to match the Ant Design specification.`,
    },
  },
  creevey: {
    skip: 'Mismatch expected because data gets regenerated by mui/x-data-grid-generator.',
  },
}
