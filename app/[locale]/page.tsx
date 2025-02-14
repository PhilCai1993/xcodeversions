import { XcodeTable } from "@/components/xcode-table"
import { LanguageSwitch } from "@/components/language-switch"
import { useTranslations } from "next-intl"

async function getData() {
  const res = await fetch("https://xcodereleases.com/data.json")
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

export default async function Home() {
  const data = await getData()
  const t = useTranslations()

  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <LanguageSwitch />
      </div>
      <XcodeTable data={data} />
    </main>
  )
}

