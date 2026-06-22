export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    console.log("Google user:", user);

    return sendRedirect(event, "/");
  },

  onError(event, error) {
    console.error("Google OAuth error:", error);

    return sendRedirect(event, "/login");
  }
});