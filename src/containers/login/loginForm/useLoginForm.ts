import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export function useLoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)

      //TODO: Implement login
      console.log(values)
    } catch (error) {
      //TODO: Implement error handling
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    form,
    isLoading,
    errors: form.formState.errors,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
