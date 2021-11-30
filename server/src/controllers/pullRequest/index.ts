import { Document, Model } from 'mongoose'

import PullRequestMdl from '@schemas/PullRequst'

class PullRequest {
  public model: Model<Document>

  constructor() {
    this.model = PullRequestMdl
  }
}

export default new PullRequest()
