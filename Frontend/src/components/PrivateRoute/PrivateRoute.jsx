import { useEffect } from 'react'

import { useSelector } from 'react-redux'

import CurrentUser from '@/Utlis/CurrentUser'
import Loading from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'

export default function PrivateRoute ({ children }) {
  const navigate = useNavigate()

  const { user, isGetUserDataLoading } = useSelector(state => state.user)

  CurrentUser()

  useEffect(() => {
    // only run after we're done loading
    if (!isGetUserDataLoading) {
      const timer = setTimeout(() => {
        if (!user?.email) {
          navigate('/Login')
        }
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isGetUserDataLoading, user?.email, navigate])

  if (isGetUserDataLoading || !user?.email) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  // authenticated!
  return <>{children}</>
}
