// Verification code printed on the Certificate of Engagement.
// Deterministic hash of the student's email + school + session ids, so the
// recruitment team can re-derive it from the claim email and confirm it.
export function verificationCode(email: string, school: string, sessionIds: string[]): string {
  const input = `${email.trim().toLowerCase()}|${school}|${[...sessionIds].sort().join(',')}`
  let h1 = 0x811c9dc5, h2 = 0x01000193
  for (let i = 0; i < input.length; i++) {
    const c = input.charCodeAt(i)
    h1 = Math.imul(h1 ^ c, 16777619) >>> 0
    h2 = Math.imul(h2 + c, 2246822519) >>> 0
  }
  const s = (h1.toString(36) + h2.toString(36)).toUpperCase().replace(/[^A-Z0-9]/g, '')
  return `CU-${s.slice(0, 4)}-${s.slice(4, 8)}-${s.slice(8, 12)}`
}
