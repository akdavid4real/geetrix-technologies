import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

const cookieName = 'geetrix-admin-session'
const cookiePayload = 'geetrix-admin'

function getAdminSecret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'change-me-in-env'
}

function sign(value: string) {
  return createHmac('sha256', getAdminSecret()).update(value).digest('hex')
}

export function createAdminSessionValue() {
  return `${cookiePayload}.${sign(cookiePayload)}`
}

export function isValidPassword(password: string) {
  const configuredPassword = process.env.ADMIN_PASSWORD

  if (!configuredPassword) {
    return false
  }

  return password === configuredPassword
}

export function verifyAdminSessionValue(value?: string | null) {
  if (!value) {
    return false
  }

  const [payload, signature] = value.split('.')
  if (!payload || !signature) {
    return false
  }

  const expectedSignature = sign(payload)
  const actual = Buffer.from(signature)
  const expected = Buffer.from(expectedSignature)

  if (actual.length !== expected.length) {
    return false
  }

  return payload === cookiePayload && timingSafeEqual(actual, expected)
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  return verifyAdminSessionValue(cookieStore.get(cookieName)?.value)
}

export const adminSessionCookieName = cookieName
