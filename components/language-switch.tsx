"use client"

import { useLocale, useTranslations } from "next-intl"
import { useRouter, usePathname } from "next-intl/client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LanguageSwitch() {
  const t = useTranslations("languageSwitch")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t("en")}</SelectItem>
        <SelectItem value="zh">{t("zh")}</SelectItem>
      </SelectContent>
    </Select>
  )
}

