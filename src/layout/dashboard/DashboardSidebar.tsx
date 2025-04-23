import { CalendarDays, HomeIcon, Settings, UniversityIcon, Users } from 'lucide-react'
import { NavLink } from 'react-router'
import React from 'react'

import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Home', path: '/dashboard/home', icon: HomeIcon },
  { name: 'Bookings', path: '/dashboard/bookings', icon: CalendarDays, iconClassName: '-mt-[1px]' },
  { name: 'Cabins', path: '/dashboard/cabins', icon: UniversityIcon, iconClassName: '-mt-0.5' },
  { name: 'Users', path: '/dashboard/users', icon: Users },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings }
]

export default function DashboardSidebar() {
  return (
    <>
      <img className="mb-6 w-full object-contain text-center" src="/assets/images/logo.png" alt="logo" />

      <nav className="font-poppins">
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink to={item.path}>
                {({ isActive }) => {
                  return (
                    <div
                      className={cn(
                        'py-2 px-4 flex items-center gap-2 text-gray-600 font-medium translate-all duration-300 hover:text-gray-700 hover:bg-gray-50',
                        isActive && 'bg-gray-50 text-gray-800 rounded-sm'
                      )}
                    >
                      {React.createElement(item.icon, {
                        className: cn('h-4.5', item.iconClassName, isActive && 'text-primary-700')
                      })}

                      <span>{item.name}</span>
                    </div>
                  )
                }}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
