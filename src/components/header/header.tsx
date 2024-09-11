import { useIsMobile } from '@/hooks'

interface HeaderProps {
  title: string
  description?: string
}

export function Header({ title, description }: HeaderProps) {
  const { isMobile } = useIsMobile()

  if (isMobile) {
    return (
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-sm">{description}</p>}
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && <p>{description}</p>}
    </div>
  )
}
