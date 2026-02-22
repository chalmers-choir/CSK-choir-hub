import AuthLoading from "@/components/AuthLoading";
import RequestLogin from "@/components/request-login";
import { useAuth } from "@/contexts";
import DefaultLayout from "@/layouts/default";

/**
 * Profile page for viewing user information.
 */
export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();

  console.log("User data:", user);
  if (loading) {
    return (
      <DefaultLayout>
        <AuthLoading />
      </DefaultLayout>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <DefaultLayout>
        <section className="flex min-h-[60vh] items-center justify-center">
          <RequestLogin>Logga in för att se din profil.</RequestLogin>
        </section>
      </DefaultLayout>
    );
  }

  const visibleGroups = user.groups.filter(
    (group) => group.type === "COMMITTEE" || group.type === "OTHER",
  );
  const fullName = `${user.firstName} ${user.lastName}`.trim() || user.username;
  const membershipTags = [
    ...user.roles.map((role) => ({
      id: `role-${role.id}`,
      label: role.name,
      type: "Roll",
    })),
    ...visibleGroups.map((group) => ({
      id: `group-${group.id}`,
      label: group.name,
      type: "Grupp",
    })),
  ];

  return (
    <DefaultLayout>
      <section className="mx-auto w-full max-w-4xl py-8 md:py-12">
        <div className="border-default-200 bg-content1/80 relative overflow-hidden rounded-3xl border p-6 shadow-lg backdrop-blur md:p-8">
          <div className="bg-primary/15 pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl" />
          <div className="bg-secondary/15 pointer-events-none absolute -bottom-24 -left-12 h-56 w-56 rounded-full blur-3xl" />

          <div className="relative space-y-8">
            <header className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div className="border-default-300 bg-background flex h-24 w-24 items-center justify-center rounded-full border text-5xl shadow-sm">
                🧑‍🎤
              </div>
              <div>
                <p className="text-small text-default-500 uppercase tracking-widest">Profil</p>
                <h1 className="text-3xl font-bold">{fullName}</h1>
                <p className="text-default-500">@{user.username}</p>
              </div>
            </header>

            <div className="space-y-3">
              <h2 className="text-small text-default-600 font-semibold uppercase tracking-wider">
                Roller och grupper
              </h2>
              <div className="flex flex-wrap gap-2">
                {membershipTags.length === 0 && (
                  <p className="text-default-500 text-sm">
                    Inga roller eller relevanta grupper än.
                  </p>
                )}
                {membershipTags.map((tag) => (
                  <span
                    key={tag.id}
                    className="border-default-300 bg-default-100 inline-flex items-center rounded-full border px-3 py-1 text-sm"
                  >
                    <span className="text-default-700 font-semibold">{tag.type}:</span>
                    <span className="text-default-600 ml-1">{tag.label}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-small text-default-600 font-semibold uppercase tracking-wider">
                Bio
              </h2>
              <p className="border-default-200 bg-background/60 text-default-600 rounded-2xl border p-4 leading-relaxed">
                Chalmerskörande nattuggla med en kärlek för stämsång, kaffe i pausen och episka
                finaler. Den här bio-texten är placeholder tills API:t är kopplat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
