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
import { HashLink } from 'react-router-hash-link'

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
    dispatch(logOut())
    navigate('/')
  }

  // Role-based menu items
  const renderMenuItems = () => {
    if (user?.role === 'Admin') {
      return (
        <>
          <DropdownMenuItem onClick={() => navigate('/admin/submissions')}>
            All Submissions
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/admin/email')}>
            Email Editor
          </DropdownMenuItem>
        </>
      )
    }
    if (user?.role === 'Artist') {
      return (
        <>
          <DropdownMenuItem onClick={() => navigate('/submit')}>
            New Submission
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/submission')}>
            My Submissions
          </DropdownMenuItem>
        </>
      )
    }
    return null
  }

  const UserMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none'>
        <Avatar className='h-9 w-9 ring-1 ring-white/10 hover:ring-purple-400 transition'>
          <AvatarImage src={user?.photoURL || ''} alt={user?.name || 'User'} />
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
        {renderMenuItems()}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className='text-red-500 cursor-pointer'
        >
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
          <HashLink
            smooth
            to='/#how-it-works'
            className='text-gray-300 hover:text-purple-400 transition-colors'
          >
            How It Works
          </HashLink>
          <HashLink
            smooth
            to='/#why-choose'
            className='text-gray-300 hover:text-purple-400 transition-colors'
          >
            Why Choose Us
          </HashLink>

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
              <div className='flex flex-col space-y-2'>
                {/* Role-based options */}
                {user.role === 'Admin' && (
                  <>
                    <Button
                      onClick={() => navigate('/submissions')}
                      variant='ghost'
                      className='w-full text-left'
                    >
                      All Submissions
                    </Button>
                    <Button
                      onClick={() => navigate('/email-editor')}
                      variant='ghost'
                      className='w-full text-left'
                    >
                      Email Editor
                    </Button>
                  </>
                )}
                {user.role === 'Artist' && (
                  <>
                    <Button
                      onClick={() => navigate('/new-submission')}
                      variant='ghost'
                      className='w-full text-left'
                    >
                      New Submission
                    </Button>
                    <Button
                      onClick={() => navigate('/my-submissions')}
                      variant='ghost'
                      className='w-full text-left'
                    >
                      My Submissions
                    </Button>
                  </>
                )}
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
