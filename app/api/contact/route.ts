import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { name, designation, company, email, phone, requirement } = body

    // Validate required fields
    if (!name || !designation || !company || !email || !requirement) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create Supabase client with actual env vars
    const { createClient } = await import('@supabase/supabase-js')
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

    // Insert into Supabase
    const { data, error } = await supabaseClient
      .from('contact_submissions')
      .insert([
        {
          name,
          designation,
          company,
          email,
          phone: phone || null,
          requirement,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit form. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Form submitted successfully', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

