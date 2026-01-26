export async function me(req, res) {
  res.json({
    success: true,
    user: {
      id: req.user.userId,
    }
  });
}
