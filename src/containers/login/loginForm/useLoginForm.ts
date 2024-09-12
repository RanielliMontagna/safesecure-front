import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getLocal } from '@/helpers/localStorage'
import { useAuthStore } from '@/store/auth/auth'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export function useLoginForm() {
  const [isLoading] = useState(false)
  const { login } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: getLocal('email') || '', password: '' },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    login(values)
  }

  return {
    form,
    isLoading,
    errors: form.formState.errors,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
