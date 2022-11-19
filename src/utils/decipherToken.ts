const jwt = require('jsonwebtoken')

export const decipherToken = <T>(token: T, secret: string): string => (jwt.verify(token, secret))._id
