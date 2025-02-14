import { useTranslations } from "next-intl"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface XcodeRelease {
  version?: {
    number?: string
    build?: string
    release?: {
      beta?: number
      rc?: number
      release?: boolean
    }
  }
  date?: {
    year?: number
    month?: number
    day?: number
  }
  compilers?: {
    clang?: Array<{ number?: string; build?: string }>
    swift?: Array<{ number?: string; build?: string }>
  }
  sdks?: {
    [key: string]: Array<{ number?: string; build?: string }>
  }
  requires?: string
  links?: {
    download?: { url?: string }
    notes?: { url?: string }
  }
}

function getReleaseStatus(release: XcodeRelease, t: (key: string) => string): JSX.Element {
  if (release.version?.release?.beta) {
    return (
      <Badge variant="secondary">
        {t("status.beta")} {release.version.release.beta}
      </Badge>
    )
  } else if (release.version?.release?.rc) {
    return (
      <Badge variant="secondary">
        {t("status.rc")} {release.version.release.rc}
      </Badge>
    )
  } else if (release.version?.release?.release) {
    return <Badge variant="default">{t("status.release")}</Badge>
  }
  return <Badge variant="outline">{t("status.unknown")}</Badge>
}

function formatDate(date?: { year?: number; month?: number; day?: number }): string {
  if (!date || !date.year || !date.month || !date.day) return "N/A"
  return `${date.year}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`
}

export function XcodeTable({ data }: { data: XcodeRelease[] }) {
  const t = useTranslations()

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHead>{t("tableHeaders.xcodeVersion")}</TableHead>
          <TableHead>{t("tableHeaders.status")}</TableHead>
          <TableHead>{t("tableHeaders.releaseDate")}</TableHead>
          <TableHead>{t("tableHeaders.swiftVersion")}</TableHead>
          <TableHead>{t("tableHeaders.clangVersion")}</TableHead>
          <TableHead>{t("tableHeaders.macOSSDK")}</TableHead>
          <TableHead>{t("tableHeaders.requiresMacOS")}</TableHead>
          <TableHead>{t("tableHeaders.links")}</TableHead>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((release, index) => {
          const isRecommended = release.version?.number === "16.1" && release.version?.release?.release
          return (
            <TableRow key={index} className={`hover:bg-gray-50 ${isRecommended ? "bg-green-50" : ""}`}>
              <TableCell className="font-medium">
                {release.version?.number} ({release.version?.build})
                {isRecommended && (
                  <Badge variant="success" className="ml-2">
                    {t("status.recommended")}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{getReleaseStatus(release, t)}</TableCell>
              <TableCell>{formatDate(release.date)}</TableCell>
              <TableCell>
                {release.compilers?.swift?.[0]?.number} ({release.compilers?.swift?.[0]?.build})
              </TableCell>
              <TableCell>
                {release.compilers?.clang?.[0]?.number} ({release.compilers?.clang?.[0]?.build})
              </TableCell>
              <TableCell>
                {release.sdks?.macOS?.[0]?.number} ({release.sdks?.macOS?.[0]?.build})
              </TableCell>
              <TableCell>{release.requires || "N/A"}</TableCell>
              <TableCell>
                {release.links?.download?.url && (
                  <a
                    href={release.links.download.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline mr-2"
                  >
                    {t("links.download")}
                  </a>
                )}
                {release.links?.notes?.url && (
                  <a
                    href={release.links.notes.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {t("links.notes")}
                  </a>
                )}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

