import { authConfig } from 'lib/auth'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authConfig)
