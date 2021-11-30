import { Button, CssBaseline, InputLabel, MenuItem, TextField } from '@material-ui/core'
import React, { useCallback } from 'react'
import { CellProps, FilterProps, FilterValue, IdType, Row, TableInstance } from 'react-table'

import { Page } from './Page'
import { Table } from './Table'
import { PersonData, makeData } from './utils'
import {PullRequest, PullRequestData} from "./model/pullRequest";

// This is a custom aggregator that
// takes in an array of values and
// returns the rounded median
function roundedMedian(values: any[]) {
  let min = values[0] || ''
  let max = values[0] || ''

  values.forEach((value) => {
    min = Math.min(min, value)
    max = Math.max(max, value)
  })

  return Math.round((min + max) / 2)
}

function filterGreaterThan(rows: Array<Row<any>>, id: Array<IdType<any>>, filterValue: FilterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id[0]]
    return rowValue >= filterValue
  })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val: any) => typeof val !== 'number'

function SelectColumnFilter({
  column: { filterValue, render, setFilter, preFilteredRows, id },
}: FilterProps<PullRequestData>) {
  const options = React.useMemo(() => {
    const options = new Set<any>()
    preFilteredRows.forEach((row) => {
      options.add(row.values[id])
    })
    return [...Array.from(options.values())]
  }, [id, preFilteredRows])

  return (
    <TextField
      select
      label={render('Header')}
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined)
      }}
    >
      <MenuItem value={''}>All</MenuItem>
      {options.map((option, i) => (
        <MenuItem key={i} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  )
}

const getMinMax = (rows: Row<PullRequestData>[], id: IdType<PullRequestData>) => {
  let min = rows.length ? rows[0].values[id] : 0
  let max = rows.length ? rows[0].values[id] : 0
  rows.forEach((row) => {
    min = Math.min(row.values[id], min)
    max = Math.max(row.values[id], max)
  })
  return [min, max]
}

function SliderColumnFilter({
  column: { render, filterValue, setFilter, preFilteredRows, id },
}: FilterProps<PullRequestData>) {
  const [min, max] = React.useMemo(() => getMinMax(preFilteredRows, id), [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}
    >
      <TextField
        name={id}
        label={render('Header')}
        type='range'
        inputProps={{
          min,
          max,
        }}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10))
        }}
      />
      <Button variant='outlined' style={{ width: 60, height: 36 }} onClick={() => setFilter(undefined)}>
        Off
      </Button>
    </div>
  )
}

const useActiveElement = () => {
  const [active, setActive] = React.useState(document.activeElement)

  const handleFocusIn = () => {
    setActive(document.activeElement)
  }

  React.useEffect(() => {
    document.addEventListener('focusin', handleFocusIn)
    return () => {
      document.removeEventListener('focusin', handleFocusIn)
    }
  }, [])

  return active
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
  column: { filterValue = [], render, preFilteredRows, setFilter, id },
}: FilterProps<PullRequestData>) {
  const [min, max] = React.useMemo(() => getMinMax(preFilteredRows, id), [id, preFilteredRows])
  const focusedElement = useActiveElement()
  const hasFocus = focusedElement && (focusedElement.id === `${id}_1` || focusedElement.id === `${id}_2`)
  return (
    <>
      <InputLabel htmlFor={id} shrink focused={!!hasFocus}>
        {render('Header')}
      </InputLabel>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          paddingTop: 5,
        }}
      >
        <TextField
          id={`${id}_1`}
          value={filterValue[0] || ''}
          type='number'
          onChange={(e) => {
            const val = e.target.value
            setFilter((old: any[] = []) => [val ? parseInt(val, 10) : undefined, old[1]])
          }}
          placeholder={`Min (${min})`}
          style={{
            width: '70px',
            marginRight: '0.5rem',
          }}
        />
        to
        <TextField
          id={`${id}_2`}
          value={filterValue[1] || ''}
          type='number'
          onChange={(e) => {
            const val = e.target.value
            setFilter((old: any[] = []) => [old[0], val ? parseInt(val, 10) : undefined])
          }}
          placeholder={`Max (${max})`}
          style={{
            width: '70px',
            marginLeft: '0.5rem',
          }}
        />
      </div>
    </>
  )
}

const columns = [
  {
    columns: [
      {
        Header: 'PR Number',
        accessor: 'number',
        disableGroupBy: true,
        disableFilters: true,
      },
      {
        Header: 'Title',
        accessor: 'title',
        disableGroupBy: true,
        disableFilters: true,
      },
      {
        Header: 'Description',
        accessor: 'description',
        disableGroupBy: true,
        disableFilters: true,
      },
      {
        Header: 'Author',
        accessor: 'author',
        disableGroupBy: true,
        disableFilters: true,
      },
      {
        Header: 'Status',
        accessor: 'status',
        disableGroupBy: true,
        filter: 'equals',
      },
      {
        Header: 'Labels',
        accessor: 'labels',
        disableGroupBy: true,
        filter: 'equals',
      },
      {
        Header: 'Creation Date',
        accessor: 'createdAt',
        disableGroupBy: true,
        disableFilters: true,
      },
    ],
  },
].flatMap((c:any)=>c.columns)

// {
//   Header: 'Description',
//       accessor: 'description',
//     width: 50,
//     minWidth: 50,
//     align: 'right',
//     Filter: SliderColumnFilter,
//     filter: 'equals',
//     aggregate: 'average',
//     disableGroupBy: true,
//     defaultCanSort: false,
//     disableSortBy: false,
//     Aggregated: ({ cell: { value } }: CellProps<PersonData>) => `${value} (avg)`,
// },

const App: React.FC = () => {
  // TODO get the data from the server
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [pullRequests, setPullRequests] = React.useState<PullRequestData[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:5000/prs")
        .then(res => res.json())
        .then(({data}) => {
          data.forEach((row: any) => {
            row.labels = row.labels.join()
          })

          return data;
        })
        .then(data => {
              setIsLoaded(true);
              setPullRequests(data);
            }
        )
        .catch(error => {
          setIsLoaded(true);
          setError(error);
        })
  }, [])

  const [data] = React.useState<PersonData[]>(() => makeData(100))

  const dummy = useCallback(
    (instance: TableInstance<PersonData>) => () => {
      console.log(
        'Selected',
        instance.selectedFlatRows.map((v) => `'${v.original.firstName} ${v.original.lastName}'`).join(', ')
      )
    },
    []
  )

  // @ts-ignore
  return (
    <Page>
      <CssBaseline />
      <CssBaseline />
      <Table<PullRequestData>
        name={'testTable'}
        columns={columns}
        data={pullRequests}
        // onAdd={dummy}
        // onEdit={dummy}
        // onDelete={dummy}

      />
    </Page>
  )
}

export default App
