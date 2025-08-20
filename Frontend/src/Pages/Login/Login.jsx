import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Eye,
  EyeOff,
  Music,
  Mail,
  Lock,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  // Animated background particles
  const [particles, setParticles] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const newParticles = [...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2
    }))
    setParticles(newParticles)
  }, [])

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)

    console.log('Login submitted:', formData)
  }

  const handleForgotPassword = () => {
    console.log('Forgot password clicked')
    // Handle forgot password logic here
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Animated background particles */}
      <div className='absolute inset-0'>
        {particles.map(particle => (
          <div
            key={particle.id}
            className='absolute w-1 h-1 bg-purple-500 rounded-full animate-pulse'
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      {/* Background gradient orbs */}
      <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse' />
      <div
        className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse'
        style={{ animationDelay: '1s' }}
      />

      {/* Login Card */}
      <Card className='w-full max-w-md bg-gray-900/80 backdrop-blur-xl border-gray-700 shadow-2xl relative z-10'>
        <CardHeader className='text-center '>
          {/* Logo */}
          <div className='flex items-center justify-center mb-4'>
            <div className='w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-xl flex items-center justify-center'>
              <Music className='text-white' size={24} />
            </div>
          </div>

          <CardTitle className='text-2xl font-bold text-white mb-2'>
            Welcome Back
          </CardTitle>

          <p className='text-gray-400'>Sign in to your MusicHub account</p>
        </CardHeader>

        <CardContent className='space-y-6'>
          {/* Login Form */}
          <div className='space-y-4'>
            {/* Email field */}
            <div>
              <label className='block text-sm font-medium text-gray-300 mb-2'>
                Email Address
              </label>
              <div className='relative'>
                <Mail
                  className='absolute left-3 top-3.5 text-gray-400'
                  size={18}
                />
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full pl-11 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300'
                  placeholder='Enter your email'
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className='text-red-400 text-sm mt-1 animate-fade-in'>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label className='block text-sm font-medium text-gray-300 mb-2'>
                Password
              </label>
              <div className='relative'>
                <Lock
                  className='absolute left-3 top-3.5 text-gray-400'
                  size={18}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  className='w-full pl-11 pr-11 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300'
                  placeholder='Enter your password'
                  disabled={isLoading}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-3.5 text-gray-400 hover:text-gray-300 transition-colors'
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className='text-red-400 text-sm mt-1 animate-fade-in'>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot password link */}
            <div className='flex justify-end'>
              <button
                type='button'
                onClick={handleForgotPassword}
                className='text-sm text-purple-400 hover:text-purple-300 transition-colors'
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit button */}
            <Button
              onClick={handleSubmit}
              className='w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
              disabled={isLoading}
            >
              {isLoading ? (
                <div className='flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>

          {/* Toggle to signup */}
          <div className='text-center pt-4 border-t border-gray-700'>
            <p className='text-gray-400'>
              Don't have an account?
              <button
                onClick={()=>navigate('/register')}
                className='ml-1 text-purple-400 hover:text-purple-300 font-semibold transition-colors'
                disabled={isLoading}
              >
                Sign Up
              </button>
            </p>
          </div>
        </CardContent>
      </Card>

     
    </div>
  )
}

export default Login
