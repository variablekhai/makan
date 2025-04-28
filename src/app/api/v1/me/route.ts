import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET() {
  const token = (await cookies()).get('token')?.value

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, process.env.NEXT_JWT_SECRET!)
    return NextResponse.json(decoded)
  } catch (err) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 403 })
  }
}
