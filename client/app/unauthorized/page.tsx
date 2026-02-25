import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold text-red-600">Access Denied</h1>
      <p className="mb-6 text-lg text-gray-600">
        You don&apos;t have permission to access this page.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button color="primary">Go Home</Button>
        </Link>
        <Link href="/login">
          <Button variant="bordered">Login</Button>
        </Link>
      </div>
    </div>
  );
}
