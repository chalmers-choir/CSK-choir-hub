import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

interface RequestLoginProps {
  children?: string;
}

export const RequestLogin = ({ children }: RequestLoginProps) => {
  return (
    <div>
      <div className="text-center">
        <p className="mb-2 text-lg">{children ?? <>Vänligen logga in för att se innehållet.</>}</p>
      </div>
      <div className="flex justify-center gap-3">
        <Link
          className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
          href="/login"
        >
          Login
        </Link>
        <Link className={buttonStyles({ variant: "bordered", radius: "full" })} href="/register">
          Register
        </Link>
      </div>
    </div>
  );
};
