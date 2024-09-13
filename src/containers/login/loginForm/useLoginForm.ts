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
  const [isLoading, setLoading] = useState(false)
  const { login } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: getLocal('email') || '', password: '' },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      await login(values)
    } finally {
      setLoading(false)
    }
  }

  return {
    form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
