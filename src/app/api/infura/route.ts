import { INFURA_GATEWAY } from '@/app/lib/constants'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const cid = url.searchParams.get('cid')
  if (!cid) return new Response('Missing CID', { status: 400 })

  const infuraUrl = `${INFURA_GATEWAY}/ipfs/${cid}`
  const res = await fetch(infuraUrl, { cache: 'no-store' })

  const headers = new Headers(res.headers)
  headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  headers.set('Vary', 'cid')
  headers.delete('set-cookie')
  

  return new Response(res.body, {
    status: res.status,
    headers,
  })
}
