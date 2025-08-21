import React from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import { logOut } from '@/Redux/Slice/AuthSlice'

const Navbar = ({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initials =
    user?.name
      ?.split(' ')
      .map(p => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'U'

  const handleLogout = () => {
    // 1) do your auth sign-out here (e.g., Firebase signOut())
    // 2) dispatch Redux action to clear user
    // dispatch(logout());
    // 3) optional: navigate home
    navigate('/')
  }

  const UserMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none'>
        <Avatar className='h-9 w-9 ring-1 ring-white/10 hover:ring-purple-400 transition'>
          <AvatarImage
            src={user?.photoURL || ''}
            alt={user?.name || 'User'}
          />
          <AvatarFallback className='bg-purple-600/20 text-purple-300 text-sm'>
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuLabel className='truncate'>
          {user?.name || 'Account'}
        </DropdownMenuLabel>
        <div className='px-2 text-xs text-muted-foreground truncate'>
          {user?.email}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>dispatch(logOut())} className='text-red-500'>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
        <Link to={'/'}>
          <div className='text-2xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent'>
            MusicHub
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center space-x-8'>
          <a
            href='#how-it-works'
            className='text-gray-300 hover:text-purple-400 transition-colors'
          >
            How It Works
          </a>
          <a
            href='#why-choose'
            className='text-gray-300 hover:text-purple-400 transition-colors'
          >
            Why Choose Us
          </a>

          {user ? (
            UserMenu
          ) : (
            <Button
              onClick={() => navigate('/login')}
              variant='outline'
              className='border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white'
            >
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden text-white'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label='Toggle menu'
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-black/95 backdrop-blur-lg border-t border-gray-800'>
          <div className='container mx-auto px-4 py-4 space-y-4'>
            <a
              href='#how-it-works'
              className='block text-gray-300 hover:text-purple-400 transition-colors'
            >
              How It Works
            </a>
            <a
              href='#why-choose'
              className='block text-gray-300 hover:text-purple-400 transition-colors'
            >
              Why Choose Us
            </a>

            {user ? (
              <div className='flex items-center justify-between'>
                {UserMenu}
                <Button
                  onClick={handleLogout}
                  variant='ghost'
                  className='text-red-400 hover:text-red-500'
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                variant='outline'
                className='w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white'
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
