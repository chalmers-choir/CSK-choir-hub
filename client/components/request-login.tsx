import { Link } from '@heroui/link';
import { button as buttonStyles } from '@heroui/theme';

interface Props {
  children?: string;
}

export default function RequestLogin({ children }: Props) {
  return (
    <div>
      <div className="text-center">
        <p className="mb-2 text-lg">{children ?? <>Vänligen logga in för att se innehållet.</>}</p>
      </div>
      <div className="flex justify-center gap-3">
        <Link
          className={buttonStyles({ color: 'primary', radius: 'full', variant: 'shadow' })}
          href="/login"
        >
          Login
        </Link>
        <Link className={buttonStyles({ variant: 'bordered', radius: 'full' })} href="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
