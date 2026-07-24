export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        code: 'FORBIDDEN_RESOURCE',
        message: "You don't have the required permissions to perform this action"
      })
    }
    next()
  }
}