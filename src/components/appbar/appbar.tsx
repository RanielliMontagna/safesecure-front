import { useCallback, useState } from 'react'

import { APPLICATION_NAME } from '@/constants'
import { Label } from '../ui/label'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Sidebar } from '../sidebar/sidebar'

import SafeSecureLogo from '@/assets/svgs/safe-secure-logo.svg'

export function Appbar() {
  const [openSidebar, setOpenSidebar] = useState(false)

  const handleCloseSidebar = useCallback(() => {
    setOpenSidebar(false)
  }, [])

  return (
    <div className="bg-gray-300 h-12 flex items-center justify-between px-4">
      <div className="w-6 h-6 flex items-center justify-center">
        <HamburgerMenuIcon
          className="w-5 h-5"
          onClick={() => setOpenSidebar(!openSidebar)}
        />
      </div>
      <Label className="text-md font-semibold tracking-tight">
        {APPLICATION_NAME}
      </Label>
      <img src={SafeSecureLogo} alt="Safe Secure Logo" className="w-6 h-6" />
      <Sidebar
        expansive={{ isOpen: openSidebar, onClose: handleCloseSidebar }}
      />
    </div>
  )
}
