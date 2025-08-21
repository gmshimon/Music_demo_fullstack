import jwt from 'jsonwebtoken'

const generateToken = userInfo => {
  const playLoad = {
    _id: userInfo?._id,
    name: userInfo.name,
    email: userInfo.email,
    role: userInfo.role
  }

  const token = jwt.sign(playLoad, process.env.TOKEN_SECRET, {
    expiresIn: '8h'
  })

  return token
}

export default generateToken