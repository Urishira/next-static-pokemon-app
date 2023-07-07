import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi'
import { signIn } from 'next-auth/react'
import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import styles from '../../styles/Form.module.css'
import FormLayout from './FormLayout'

type ValueForm = {
  email: string
  password: string
}

const schema = z.object({
  email: z.string().email({ message: 'this is not a valid email' }),
  packageName: z.string().min(8, 'this password is invalid')
})

export default function Login() {
  const [show, setShow] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValueForm>({
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<ValueForm> = async values => {
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/'
    })

    if (status?.ok) router.push(status.url as string)
  }

  async function handleGoogleSignin() {
    signIn('google', { callbackUrl: 'http://localhost:3000' })
  }

  return (
    <FormLayout>
      <Head>
        <title>Login</title>
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Pokemon</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.input_group} ${errors.email ? 'border-rose-600' : ''}`}>
            <input
              type="email"
              placeholder="Email"
              className={styles.input_text}
              {...register('email')}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>

          <div className={`${styles.input_group} ${errors.password ? 'border-rose-600' : ''}`}>
            <input
              type={`${show ? 'text' : 'password'}`}
              placeholder="password"
              className={styles.input_text}
              {...register('password')}
            />
            <span className="icon flex items-center px-4" onClick={() => setShow(!show)}>
              <HiFingerPrint size={25} />
            </span>
          </div>

          <div className="input-button">
            <button type="submit" className={styles.button}>
              SignIn
            </button>
          </div>
          <div className="input-button">
            <button type="button" onClick={handleGoogleSignin} className={styles.button_custom}>
              Sign In with Google <Image src={'/assets/google.svg'} width="20" height={20}></Image>
            </button>
          </div>
        </form>

        <p className="text-center text-gray-400 ">
          don't have an account yet?{' '}
          <Link href={'/signup'}>
            <a className="text-blue-700">Sign Up</a>
          </Link>
        </p>
      </section>
    </FormLayout>
  )
}
