import { INFURA_GATEWAY } from '@/app/lib/constants'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const cid = url.searchParams.get('cid')
  if (!cid) return new Response('Missing CID', { status: 400 })

  const infuraUrl = `${INFURA_GATEWAY}/ipfs/${cid}`

  const res = await fetch(infuraUrl, {
    headers: { 'x-cid': cid },
    cache: 'no-store',
    next: { revalidate: 0 },
  })

  const blob = await res.blob()

  const headers = new Headers()
  headers.set('Content-Type', blob.type)
  headers.set('Content-Length', blob.size.toString())
  headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  headers.set('Vary', 'x-cid')

  return new Response(blob, {
    status: res.status,
    headers,
  })
}
