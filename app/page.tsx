import { XcodeTable } from "@/components/xcode-table"

async function getData() {
  const res = await fetch("https://xcodereleases.com/data.json")
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Xcode Versions</h1>
      <XcodeTable data={data} />
    </main>
  )
}

