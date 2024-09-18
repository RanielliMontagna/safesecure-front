import { useIsMobile } from '@/hooks'
import { Button } from '../ui/button'
import { HeaderProps } from './header.types'

export function Header({ title, description, button }: HeaderProps) {
  const { isMobile } = useIsMobile()

  if (isMobile) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="text-sm">{description}</p>}
        </div>
        <div className="absolute inset-y-2.5 right-2.5 flex items-end justify-end">
          {button && !button.disablemobile && (
            <Button
              {...button}
              className="p-2 rounded-full w-14 h-14 flex item-center justify-center">
              {button.icon && <button.icon className="w-6 h-6" />}
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {button && (
        <Button {...button} startIcon={button.icon} size="lg">
          {button.text}
        </Button>
      )}
    </div>
  )
}
