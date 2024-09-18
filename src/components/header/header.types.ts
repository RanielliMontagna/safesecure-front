import type { ButtonProps } from '../ui/button'
import type { IconProps } from '@radix-ui/react-icons/dist/types'

interface HeaderButtonProps extends Omit<ButtonProps, 'children'> {
  text: string
  icon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
  disablemobile?: string
}

export interface HeaderProps {
  title: string
  description?: string
  button?: HeaderButtonProps
}
