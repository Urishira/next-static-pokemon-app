import type { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '../../firebase/firebase-config'
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5, 'password should be at least 5 characters')
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  if (method !== 'POST') {
    return res.status(405).json({
      error: { message: `Method ${method} Not Allowed` }
    })
  }

  const response = schema.safeParse(req.body)
  if (!response.success) {
    const { errors } = response.error
    return res.status(400).json({
      error: { message: 'Invalid request', errors }
    })
  }
  const { email, password } = response.data

  const signInMethod = fetchSignInMethodsForEmail(auth, email)

  if (signInMethod && (await signInMethod).length > 0) {
    return res.status(400).json({ error: 'The email is already in use' })
  }

  const { user } = await createUserWithEmailAndPassword(auth, email, password)

  res.status(200).json({ name: user.displayName, email: user.email })
}
