export type PullRequest = {
    number: number
    title: string
    description: string
    author: string
    status: string
    labels: string
}

export type PullRequestData = PullRequest & {
    subRows?: PullRequestData[]
}

export enum Status {
    Draft = "draft",
    Open = "open",
    Closed = "closed"
}
