
import { NextResponse } from 'next/server'
import { answerQuestion } from '@/lib/plants'

export async function POST(req: Request) {
  const { q } = await req.json()
  const a = answerQuestion(q || '')
  return NextResponse.json({ answer: a })
}
