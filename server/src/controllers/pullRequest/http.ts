import PullRequestCtrl from './index'
import * as validator from './validator'
import {IHttp, IReq, IRes} from "@ctrls/http";

const http: IHttp = {}

http.get = async (req: IReq, res: IRes) => {
  const data = await PullRequestCtrl.model.find().lean()

  res.response = { data, message: req.polyglot.t('successMessage') }
}

http.post = async (req: IReq, res: IRes) => {
  await validator.post(req.yup, req.body)

  const body = req.body
  const pullRequest = await PullRequestCtrl.model.create(body)

  res.data = pullRequest
}

export default http
