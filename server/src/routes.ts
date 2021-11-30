import { NextFunction, Request, Response, Router } from 'express'

import httpPullRequest from '@ctrls/pullRequest/http'

const router = Router()

const catchError = (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res)

    next()
  } catch (error) {
    next(error)
  }
}

// Pull Requests
router.get('/prs', catchError(httpPullRequest.get))
router.post('/prs', catchError(httpPullRequest.post))


export default router
