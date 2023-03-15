/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Edit this file to add new stories
import React from 'react'
import type { GridDemoData } from '@mui/x-data-grid-generator'
import { useDemoData } from '@mui/x-data-grid-generator'

import type {
  DataGridProps,
  GridRowParams,
  GridRowSelectionModel,
  GridRowsProp,
} from '@monorail/components'
import { DataGrid } from '@monorail/components'

import { story } from '../helpers/storybook.js'

export default {
  title: 'Data Grid/Selection',
  component: DataGrid,
  parameters: {
    creevey: {
      skip: 'Mismatch expected because data gets regenerated by mui/x-data-grid-generator.',
    },
  },
}

const Template = story<DataGridProps>((args: Partial<DataGridProps>) => {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 6,
  })

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid {...data} {...args} />
    </div>
  )
})

export const Default = story(Template)

Default.parameters = {
  docs: {
    description: {
      component: `Selection allows the user to select and highlight a number of rows that they can then take action on.

### Row selection

Row selection can be performed with a simple mouse click, or using the  [keyboard shortcuts](https://mui.com/components/data-grid/accessibility/#selection). The grid supports single and multiple row selection.

### Single row selection

Single row selection is enable by default with the  \`DataGrid\`  component. To unselect a row, hold the  CTRL  key and click on it. For the  \`DataGridPro\`, you need to disable multiple row selection with  \`disableMultipleSelection={true}\`.`,
    },
  },
  creevey: {
    skip: 'Mismatch expected because data gets regenerated by mui/x-data-grid-generator.',
  },
}

/**
 * Multiple row selection
 */
export const MultipleRowSelectionGrid = story<DataGridProps>(() => {
  // const { data } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 10,
  //   maxColumns: 6,
  // })

  return (
    <></>
    // TODO(storybook): Uncomment once we have DataGridPro (paid)
    // <div style={{ height: 400, width: '100%' }}>
    //   <DataGridPro {...data} />
    // </div>
  )
})

MultipleRowSelectionGrid.storyName = 'Multiple row selection'
MultipleRowSelectionGrid.parameters = {
  docs: {
    description: {
      story: `❗️ Only available in \`DataGridPro\`
      
To select multiple rows on the \`DataGridPro\` component, hold the \`CTRL\` key while selecting rows.`,
    },
  },
  creevey: {
    skip: "Story relies on DataGridPro (paid) which we don't have yet.",
  },
}

/**
 * Checkbox selection
 */
export const CheckboxSelectionGrid = story<DataGridProps>(args => {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 6,
  })

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid checkboxSelection {...args} {...data} />
    </div>
  )
})

CheckboxSelectionGrid.storyName = 'Checkbox selection'
CheckboxSelectionGrid.parameters = {
  docs: {
    description: {
      story: `To activate checkbox selection set \`checkboxSelection={true}\`.`,
    },
  },
  creevey: {
    skip: 'Mismatch expected because data gets regenerated by mui/x-data-grid-generator.',
  },
}

/**
 * Disable selection on click
 */
export const DisableClickSelectionGrid = story<DataGridProps>(args => {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 6,
  })

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        checkboxSelection
        disableRowSelectionOnClick
        {...args}
        {...data}
      />
    </div>
  )
})

DisableClickSelectionGrid.storyName = 'Disable selection on click'
DisableClickSelectionGrid.parameters = {
  docs: {
    description: {
      story: `You might have interactive content in the cells and need to disable the selection of the row on click. Use the \`disableSelectionOnClick\` prop in this case.`,
    },
    creevey: {
      skip: 'Mismatch expected because data gets regenerated by mui/x-data-grid-generator.',
    },
  },
}

/**
 * Disable selection on certain rows
 */
export const DisableRowSelection = story<DataGridProps>(args => {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  })

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        {...args}
        {...data}
        isRowSelectable={(params: GridRowParams<{ quantity: number }>) =>
          params.row.quantity > 50000
        }
        checkboxSelection
      />
    </div>
  )
})

DisableRowSelection.storyName = 'Disable selection on certain rows'
DisableRowSelection.parameters = {
  docs: {
    description: {
      story: `Use the  \`isRowSelectable\`  prop to indicate if a row can be selected. It's called with a  \`GridRowParams\`  object and should return a boolean value. If not specified, all rows are selectable.

In the demo below only rows with quantity above 50000 can be selected:`,
    },
  },
  creevey: {
    skip: 'Mismatch expected because data gets regenerated by mui/x-data-grid-generator.',
  },
}

/**
 * Controlled selection
 */
export const ControlledSelectionGrid = story<DataGridProps>(args => {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 6,
  })

  const [selectionModel, setSelectionModel] =
    React.useState<GridRowSelectionModel>([])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        checkboxSelection
        onRowSelectionModelChange={newSelectionModel => {
          setSelectionModel(newSelectionModel)
        }}
        rowSelectionModel={selectionModel}
        {...data}
        {...args}
      />
    </div>
  )
})

ControlledSelectionGrid.storyName = 'Controlled selection'
ControlledSelectionGrid.parameters = {
  docs: {
    description: {
      story: `Use the \`selectionModel\` prop to control the selection. Each time this prop changes, the \`onSelectionModelChange\` callback is called with the new selection value.`,
    },
  },
  creevey: {
    skip: 'Mismatch expected because data gets regenerated by mui/x-data-grid-generator.',
  },
}

/**
 * Usage with server-side pagination
 */
function loadServerRows(page: number, data: GridDemoData): Promise<any> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data.rows.slice(page * 5, (page + 1) * 5))
    }, Math.random() * 500 + 100) // simulate network latency
  })
}

export const ControlledSelectionServerPaginationGrid = story<DataGridProps>(
  args => {
    const { data } = useDemoData({
      dataSet: 'Commodity',
      rowLength: 100,
      maxColumns: 6,
    })

    const [page, setPage] = React.useState(0)
    const [rows, setRows] = React.useState<GridRowsProp>([])
    const [loading, setLoading] = React.useState(false)
    const [selectionModel, setSelectionModel] =
      React.useState<GridRowSelectionModel>([])
    const prevSelectionModel =
      React.useRef<GridRowSelectionModel>(selectionModel)

    React.useEffect(() => {
      let active = true

      ;(async () => {
        setLoading(true)
        const newRows = await loadServerRows(page, data)

        if (!active) {
          return
        }

        setRows(newRows)
        setLoading(false)
        setTimeout(() => {
          setSelectionModel(prevSelectionModel.current)
        })
      })()

      return () => {
        active = false
      }
    }, [page, data])

    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          {...args}
          rows={rows}
          columns={data.columns}
          pagination
          checkboxSelection
          pageSizeOptions={[5]}
          rowCount={100}
          paginationMode="server"
          onPaginationModelChange={newPaginationModel => {
            prevSelectionModel.current = selectionModel
            setPage(newPaginationModel.page)
          }}
          onRowSelectionModelChange={newSelectionModel => {
            setSelectionModel(newSelectionModel)
          }}
          rowSelectionModel={selectionModel}
          loading={loading}
        />
      </div>
    )
  },
)
ControlledSelectionServerPaginationGrid.storyName =
  'Usage with server-side pagination'
ControlledSelectionServerPaginationGrid.parameters = {
  docs: {
    description: {
      story: `Using the controlled selection with  \`paginationMode="server"\`  may result in selected rows being lost when the page is changed. This happens because the grid cross-checks with the  \`rows\`  prop and only calls  \`onSelectionModelChange\`  with existing row IDs. Depending on your server-side implementation, when the page changes and the new value for the  \`rows\`  prop does not include previously selected rows, the grid will call  \`onSelectionModelChange\`  with an empty value. To prevent this unwanted behavior, there are two ways:

-   Save the  \`selectionModel\`  **before the page is changed**  and restore it later
-   Append the newly loaded rows to the existing rows

The following demo shows how to implement the first solution:`,
    },
  },
  creevey: {
    skip: 'Mismatch expected because data gets regenerated by mui/x-data-grid-generator.',
  },
}

/**
 * apiRef - Selection
 */
export const DataGridSelectionApiRef = story<DataGridProps>(() => <></>)
DataGridSelectionApiRef.storyName = 'apiRef'
DataGridSelectionApiRef.parameters = {
  docs: {
    description: {
      story: `❗️ Only available in \`DataGridPro\` [apiRef](https://mui.com/components/data-grid/editing/#apiref)
      
The grid exposes a set of methods that enables all of these features using the imperative apiRef.

> ⚠️ Only use this API when you have no alternative. Always start from the declarative API that the grid exposes.

-   \`getSelectedRows()\`: Returns an array of the selected rows.
-   \`isRowSelected()\`: Determines if a row is selected or not.
-   \`selectRow()\`: Change the selection state of a row.
-   \`selectRows()\`: Change the selection state of multiple rows.
-   \`setSelectionModel()\`: Updates the selected rows to be those passed to the \`rowIds\` argument. Any row already selected will be unselected.`,
    },
  },
  creevey: {
    skip: "Story relies on DataGridPro (paid) which we don't have yet.",
  },
}

/**
 * Range selection
 */
export const RangeSelection = story<DataGridProps>(() => <></>)
RangeSelection.storyName = 'Row selection'
RangeSelection.parameters = {
  docs: {
    description: {
      story: `>🚧 This feature isn't implemented yet. It's coming.

With this feature, you will be able to select ranges of cells across the Grid.`,
    },
  },
  creevey: {
    skip: "🚧 This feature isn't implemented yet. It's coming.",
  },
}
