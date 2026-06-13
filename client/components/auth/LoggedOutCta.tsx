import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { useTranslation } from '@/contexts/IntlContext';

type LoggedOutCtaProps = {
  message?: string;
};

/**
 * Reusable call-to-action for unauthenticated visitors.
 */
export const LoggedOutCta = ({ message }: LoggedOutCtaProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {message && <p className="mb-1 text-lg">{message}</p>}
      <div className="flex gap-3">
        <Link className={buttonVariants()} href={siteConfig.links.login}>
          {t('common.login')}
        </Link>
        <Link className={buttonVariants({ variant: 'outline' })} href={siteConfig.links.register}>
          {t('common.register')}
        </Link>
      </div>
    </div>
  );
};
