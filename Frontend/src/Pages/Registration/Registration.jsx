import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Music, Mail, Lock, User, Check, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  })

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

    // Update password strength when password changes
    if (name === 'password') {
      setPasswordStrength({
        hasMinLength: value.length >= 8,
        hasUpperCase: /[A-Z]/.test(value),
        hasLowerCase: /[a-z]/.test(value),
        hasNumber: /\d/.test(value),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value)
      })
    }

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

    if (!formData.name) {
      newErrors.name = 'Full name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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

    console.log('Registration submitted:', formData)
  }

  const getPasswordStrengthScore = () => {
    const checks = Object.values(passwordStrength)
    return checks.filter(Boolean).length
  }

  const getPasswordStrengthColor = () => {
    const score = getPasswordStrengthScore()
    if (score < 2) return 'bg-red-500'
    if (score < 4) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getPasswordStrengthText = () => {
    const score = getPasswordStrengthScore()
    if (score < 2) return 'Weak'
    if (score < 4) return 'Medium'
    return 'Strong'
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

      {/* Register Card */}
      <Card className='w-full max-w-md bg-gray-900/80 backdrop-blur-xl border-gray-700 shadow-2xl relative z-10 mt-16'>
        <CardHeader className='text-center'>
          {/* Logo */}
          <div className='flex items-center justify-center mb-4'>
            <div className='w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-xl flex items-center justify-center'>
              <Music className='text-white' size={24} />
            </div>
          </div>

          <CardTitle className='text-2xl font-bold text-white mb-2'>
            Create Account
          </CardTitle>

          <p className='text-gray-400'>Join MusicHub and start your journey</p>
        </CardHeader>

        <CardContent className='space-y-6'>
          {/* Registration Form */}
          <div className='space-y-4'>
            {/* Name field */}
            <div>
              <label className='block text-sm font-medium text-gray-300 mb-2'>
                Full Name
              </label>
              <div className='relative'>
                <User
                  className='absolute left-3 top-3.5 text-gray-400'
                  size={18}
                />
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className='w-full pl-11 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300'
                  placeholder='Enter your full name'
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <p className='text-red-400 text-sm mt-1 animate-fade-in'>
                  {errors.name}
                </p>
              )}
            </div>

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
                  placeholder='Create a strong password'
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

              {/* Password strength indicator */}
              {formData.password && (
                <div className='mt-2 space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span className='text-xs text-gray-400'>
                      Password strength:
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        getPasswordStrengthScore() < 2
                          ? 'text-red-400'
                          : getPasswordStrengthScore() < 4
                          ? 'text-yellow-400'
                          : 'text-green-400'
                      }`}
                    >
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className='w-full bg-gray-700 rounded-full h-1.5'>
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{
                        width: `${(getPasswordStrengthScore() / 5) * 100}%`
                      }}
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-1 text-xs'>
                    {[
                      { key: 'hasMinLength', text: '8+ characters' },
                      { key: 'hasUpperCase', text: 'Uppercase' },
                      { key: 'hasLowerCase', text: 'Lowercase' },
                      { key: 'hasNumber', text: 'Number' }
                    ].map(requirement => (
                      <div
                        key={requirement.key}
                        className='flex items-center space-x-1'
                      >
                        {passwordStrength[requirement.key] ? (
                          <Check size={12} className='text-green-400' />
                        ) : (
                          <X size={12} className='text-gray-500' />
                        )}
                        <span
                          className={
                            passwordStrength[requirement.key]
                              ? 'text-green-400'
                              : 'text-gray-500'
                          }
                        >
                          {requirement.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password field */}
            <div>
              <label className='block text-sm font-medium text-gray-300 mb-2'>
                Confirm Password
              </label>
              <div className='relative'>
                <Lock
                  className='absolute left-3 top-3.5 text-gray-400'
                  size={18}
                />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className='w-full pl-11 pr-11 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300'
                  placeholder='Confirm your password'
                  disabled={isLoading}
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-3.5 text-gray-400 hover:text-gray-300 transition-colors'
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className='text-red-400 text-sm mt-1 animate-fade-in'>
                  {errors.confirmPassword}
                </p>
              )}
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
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </div>

          {/* Toggle to login */}
          <div className='text-center pt-4 border-t border-gray-700'>
            <p className='text-gray-400'>
              Already have an account?
              <button
                onClick={() => navigate('/login')}
                className='ml-1 text-purple-400 hover:text-purple-300 font-semibold transition-colors'
              >
                Sign In
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Registration
