import { useForm } from 'react-hook-form'

import { loginSchema, type LoginSchema } from '@/schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'

export default function AuthLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  async function onSubmit(data: LoginSchema) {
    clearErrors()
    // TODO: Add authentication logic here
    await new Promise((res) => setTimeout(res, 1000))
    // Simulate error for demo
    if (data.email === '' || data.password === '') {
      setError('root', { message: 'Email and password are required' })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md border border-primary-100"
        noValidate
      >
        <Heading variant="h2" className="text-primary-700 mb-6 text-center">
          Login to Your Account
        </Heading>
        <div className="space-y-4">
          <FormInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
            {...register('email')}
            errorMessage={errors.email?.message}
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
            {...register('password')}
            errorMessage={errors.password?.message}
          />
        </div>
        {errors.root?.message && <div className="text-red-700 mt-4 text-center">{errors.root.message}</div>}
        <Button
          type="submit"
          className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-primary-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  )
}
