import { useIsMobile } from '@/hooks'
import { cn } from '@/utils'

import EmptySearchSVG from '@/assets/svgs/empty-search.svg'

interface EmptyStateProps {
  title: string
  message: React.ReactNode
  className?: React.HTMLAttributes<HTMLDivElement>['className']
}

export function EmptyState({ title, message, className }: EmptyStateProps) {
  const { isMobile } = useIsMobile()

  return (
    <div
      className={cn(
        'w-full h-full flex flex-col items-center justify-center text-center p-4',
        className,
      )}>
      <img
        src={EmptySearchSVG}
        alt="Lupa apontando para um sistema de arquivos, indicando que não há resultados"
        className={cn('w-1/4 h-auto mb-4', isMobile && 'w-1/2')}
      />
      <h2 className={cn('text-2xl font-semibold', isMobile && 'text-xl')}>
        {title}
      </h2>
      <p className={cn('text-gray-500', isMobile && 'text-sm')}>{message}</p>
    </div>
  )
}
