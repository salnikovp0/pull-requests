import { NextFunction, Request, Response, Router } from 'express'

import httpUser from '@ctrls/user/http'
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

// USER
router.get('/', catchError(httpUser.get))
router.post('/', catchError(httpUser.post))

// Pull Requests
router.get('/prs', catchError(httpPullRequest.get))
router.post('/prs', catchError(httpPullRequest.post))


export default router
