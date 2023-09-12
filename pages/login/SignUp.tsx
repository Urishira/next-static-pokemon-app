import React, { BlockquoteHTMLAttributes } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TFormValue } from '.'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import styles from '../../styles/Form.module.css'

import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi'

type TSignUpProp = {
  setShow: (show: boolean) => void
  show: boolean
}
type TformSignUp = TFormValue & { confirmPassword: string }
const schema = z
  .object({
    email: z.string().email({ message: 'this is not a valid email' }),
    password: z
      .string()
      .min(8, 'this password is not invalid')
      .max(16, 'this password is not valid and must be at least 16 characters'),
    confirmPassword: z
      .string()
      .min(8, 'this password is not invalid')
      .max(16, 'this password is not valid and must be at least 16 characters')
  })
  .refine(data => data.password !== data.confirmPassword, {
    message: 'this password does not match',
    path: ['confirmPassword']
  })

const SignUp: React.FC<TSignUpProp> = ({ setShow, show }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<TformSignUp>({
    resolver: zodResolver(schema)
  })
  const onSubmit: SubmitHandler<TformSignUp> = async values => {
    const router = useRouter()
    console.log(values)
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/'
    })

    if (status?.ok) router.push(status.url as string)
  }
  return (
    <form
      className="flex flex-col gap-5 animate-fade-down animate-ease-linear"
      onSubmit={handleSubmit(onSubmit)}
    >
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
      {errors.email?.message ? (
        <p className="bg-red-600 rounded-md text-gray-50 p-1">{errors.email.message}</p>
      ) : null}
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
      <div className={`${styles.input_group} ${errors.confirmPassword ? 'border-rose-600' : ''}`}>
        <input
          type={`${show ? 'text' : 'password'}`}
          placeholder="Confirm password"
          className={styles.input_text}
          {...register('confirmPassword')}
        />
      </div>
      {errors.password?.message ? (
        <p className="bg-red-600 rounded-md text-gray-50 p-1">{errors.password?.message}</p>
      ) : null}

      <button disabled={!isDirty || !isValid} className={styles.button}>
        SignIn
      </button>
    </form>
  )
}

export default SignUp
