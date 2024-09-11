import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface LoginFormValues {
  email: string
  password: string
}

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true)

      console.log(data)
      //TODO: implement login logic
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      //TODO: handle error
      console.error(error)
    } finally {
      setIsLoading(false)
      reset()
    }
  }

  return {
    errors,
    isLoading,
    register,
    onSubmit: handleSubmit(onSubmit),
  }
}
