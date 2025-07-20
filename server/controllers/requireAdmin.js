const requireAdmin = (req, res, next) => {
  // Check if the authenticated user has the admin role
  if (req.auth?.role !== "admin") {
    return res.status(403).json({ error: "Admin access required." });
  }
  next(); // User is admin, allow access
};

export default requireAdmin;
