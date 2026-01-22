/**
 * Consistent loading indicator for auth-dependent views.
 */
const AuthLoading = () => (
  <div className="text-default-500 flex h-32 items-center justify-center">
    <div
      aria-label="Laddar"
      className="border-default-300 border-t-primary mr-3 h-8 w-8 animate-spin rounded-full border-2"
    />
    <span>Kontrollerar inloggning...</span>
  </div>
);

export default AuthLoading;
