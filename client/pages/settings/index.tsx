import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "@/contexts";
import DefaultLayout from "@/layouts/default";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <div>
        {
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t("settings.change_lang")}
          </label>
        }
        <LanguageSwitcher />
      </div>
    </DefaultLayout>
  );
}
