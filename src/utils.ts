import { Headers } from 'cross-fetch'
import { HTTPOptions, HTTPOptionsTransformer } from 'extra-request'
import { fromCode } from '@blackglory/http-status'
import { Json } from '@blackglory/types'

export function password(password: string): HTTPOptionsTransformer {
  return (options: HTTPOptions) => {
    const headers = new Headers(options.headers)
    headers.set('Authorization', `Bearer ${password}`)
    return {
      ...options
    , headers
    }
  }
}

export function checkHTTPStatus(res: Response): Response {
  if (!res.ok) throw fromCode(res.status)
  return res
}

export function toJSON(res: Response): Promise<Json> {
  return res.json()
}

export function toText(res: Response): Promise<string> {
  return res.text()
}
