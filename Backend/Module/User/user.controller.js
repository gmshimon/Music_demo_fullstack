import Users from './user.model.js'
export const createUser = async (req, res, next) => {
  try {
    const userData = req.body
    console.log(req.body)
    const { email } = userData

    const user = await Users.findOne({ email: email })
    if (user) {
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
      const token = generateToken(data)
      return res.status(200).json({
        status: 'Success',
        message: 'User already exists',
        data: user,
        token: token
      })
    } else {
    
      const createUser = await Users.create(userData)
      const token = generateToken(result)
      res.status(200).json({
        status: 'Success',
        message: 'User created successfully',
        data: createUser,
        token: token
      })
    }
  } catch (error) {
    res.status(200).json({
      status: 'Failed',
      message: error.message
    })
  }
}

export const fetchUser = async (req, res, next) => {
  try {
    const data = req.body
    const user = await Users.findOne({ email: data.email }).lean()
    if (!user) {
      return res.status(404).json({
        status: 'Fail',
        message: 'User not found'
      })
    }

    res.status(200).json({
      status: 'Success',
      message: 'User fetched successfully',
      data: user
    })
  } catch (error) {
    next(error)
  }
}