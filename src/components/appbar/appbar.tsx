import { useCallback, useState } from 'react'

import { APPLICATION_NAME } from '@/constants'
import { Label } from '../ui/label'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Sidebar } from '../sidebar/sidebar'
import { useAuthStore } from '@/store/auth/auth'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { getInitials } from '@/utils'

export function Appbar() {
  const { user } = useAuthStore()
  const [openSidebar, setOpenSidebar] = useState(false)

  const handleCloseSidebar = useCallback(() => {
    setOpenSidebar(false)
  }, [])

  return (
    <div className="bg-gray-200 h-12 flex items-center justify-between px-4">
      <HamburgerMenuIcon
        className="w-5 h-5"
        onClick={() => setOpenSidebar(!openSidebar)}
      />
      <Label className="text-lg font-semibold tracking-tight">
        {APPLICATION_NAME}
      </Label>
      <Avatar className="w-6 h-6">
        <AvatarFallback className="text-xs">
          {getInitials(user?.name)}
        </AvatarFallback>
      </Avatar>
      <Sidebar
        expansive={{ isOpen: openSidebar, onClose: handleCloseSidebar }}
      />
    </div>
  )
}
