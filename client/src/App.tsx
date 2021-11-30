import { CssBaseline } from '@material-ui/core'
import React from 'react'

import { Page } from './Page'
import { Table } from './Table'
import { PullRequestData} from "./model/pullRequest";

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

  // @ts-ignore
  return (
    <Page>
      <CssBaseline />
      <CssBaseline />
      <Table<PullRequestData>
        name={'testTable'}
        columns={columns}
        data={pullRequests}
      />
    </Page>
  )
}

export default App
