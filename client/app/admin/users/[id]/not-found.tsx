import Link from "next/link";

export default function UserNotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-3 py-8">
      <h1 className="text-2xl font-semibold">User not found</h1>
      <p className="text-default-600">The user may have been removed or the link is invalid.</p>
      <Link
        href="/admin/users"
        className="bg-foreground text-background w-fit rounded-md px-4 py-2"
      >
        Back to users
      </Link>
    </section>
  );
}
