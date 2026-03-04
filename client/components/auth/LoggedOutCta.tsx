import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { useTranslation } from "@/contexts/IntlContext";

type LoggedOutCtaProps = {
  message?: string;
};

/**
 * Reusable call-to-action for unauthenticated visitors.
 */
const LoggedOutCta = ({ message }: LoggedOutCtaProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {message && <p className="mb-1 text-lg">{message}</p>}
      <div className="flex gap-3">
        <Link
          className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
          href={siteConfig.links.login}
        >
          {t("common.login")}
        </Link>
        <Link
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.register}
        >
          {t("common.register")}
        </Link>
      </div>
    </div>
  );
};

export default LoggedOutCta;
