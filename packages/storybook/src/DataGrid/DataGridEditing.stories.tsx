// Edit this file to add new stories
import React from 'react'

import type { DataGridProps, GridColDef, GridRowId } from '@monorail/components'
import { DataGrid } from '@monorail/components'

import { story } from '../helpers/storybook.js'

export default {
  title: 'Data Grid/Virtualization',
  component: DataGrid,
  parameters: {
    creevey: {
      skip: 'Mismatch expected because data gets regenerated by mui/x-data-grid-generator.',
    },
  },
}

interface DataRowModel {
  id: GridRowId
  [price: string]: number | string
}

interface GridData {
  columns: Array<GridColDef>
  rows: Array<DataRowModel>
}

const useData = (rowLength: number, columnLength: number) => {
  const [data, setData] = React.useState<GridData>({ columns: [], rows: [] })

  React.useEffect(() => {
    const rows: Array<DataRowModel> = []

    for (let i = 0; i < rowLength; i += 1) {
      const row: DataRowModel = {
        id: i,
      }

      for (let j = 1; j <= columnLength; j += 1) {
        row[`price${j}M`] = `${i.toString()}, ${j}`
      }

      rows.push(row)
    }

    const columns: Array<GridColDef> = [{ field: 'id' }]

    for (let j = 1; j <= columnLength; j += 1) {
      columns.push({ field: `price${j}M`, headerName: `${j}M` })
    }

    setData({
      rows,
      columns,
    })
  }, [rowLength, columnLength])

  return data
}

const Template = story<DataGridProps>(args => {
  const data = useData(100, 1000)

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid {...args} {...data} columnBuffer={2} />
    </div>
  )
})

export const Default = story(Template)

Default.parameters = {
  docs: {
    description: {
      component: `The grid is high performing thanks to its rows and columns virtualization engine.

DOM virtualization is the feature that allows the grid to handle an unlimited* number of rows and columns. This is a built-in feature of the rendering engine and greatly improves rendering performance.

_*unlimited: Browsers set a limit on the number of pixels a scroll container can host: 17.5 million pixels on Firefox, 33.5 million pixels on Chrome, Edge, and Safari. A  [reproduction](https://codesandbox.io/s/beautiful-silence-1yifo?file=/src/App.js)._

### Row virtualization

Row virtualization is the insertion and removal of rows as the grid scrolls vertically.

The grid renders twice as many rows as are visible. It isn't configurable yet. Row virtualization is limited to 100 rows in the  \`DataGrid\`  component.

### Column virtualization

Column virtualization is the insertion and removal of columns as the grid scrolls horizontally.

-   Overscanning by at least one column allows the arrow key to focus on the next (not yet visible) item.
-   Overscanning slightly can reduce or prevent a flash of empty space when a user first starts scrolling.
-   Overscanning more allows the built-in search feature of the browser to find more matching cells.
-   Overscanning too much can negatively impact performance.

By default, 2 columns are rendered outside of the viewport. You can change this option with the  \`columnBuffer\`  prop. The demo below renders 1,000 columns in total:

(You can disable column virtualization by setting the column buffer to a higher number than the number of rendered columns, e.g. with \`columnBuffer={columns.length}\` or \`columnBuffer={Number.MAX_SAFE_INTEGER}\`)

### Disable virtualization

The virtualization can be disabled completely using the  \`disableVirtualization\`  prop. You may want to turn it off to be able to test the grid with a headless browser, like jsdom.

	<DataGrid {...data} disableVirtualization />

**Note**: Disabling the virtualization will increase the size of the DOM and drastically reduce the performance. Use it only for testing purposes or on small datasets.`,
    },
  },
}
