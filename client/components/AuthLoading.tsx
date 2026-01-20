/**
 * Consistent loading indicator for auth-dependent views.
 */
const AuthLoading = () => (
  <div className="flex h-32 items-center justify-center text-default-500">
    <div
      className="mr-3 h-8 w-8 animate-spin rounded-full border-2 border-default-300 border-t-primary"
      aria-label="Laddar"
    />
    <span>Kontrollerar inloggning...</span>
  </div>
);

export default AuthLoading;
