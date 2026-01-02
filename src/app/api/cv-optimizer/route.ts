import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { CVData } from '@/utils/cvTypes'

// Initialize OpenAI with latest model support
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, currentCV }: { jobDescription: string; currentCV: CVData } = await request.json()

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-api-key-here') {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add your API key to .env.local' },
        { status: 500 }
      )
    }

    // Use GPT-4 for better analysis
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // or "gpt-4" if you prefer
      messages: [
        {
          role: "system",
          content: `You are an expert resume consultant. Analyze the job description and the current CV, then provide specific suggestions to optimize the CV for this role. Focus on:
1. Keywords that should be added to match the job description
2. Skills that should be emphasized or reordered
3. Experience bullets that could be rewritten to highlight relevant achievements
4. Any missing skills or certifications mentioned in the job description

Return your response as a JSON object with this structure:
{
  "summary": "Brief overview of main recommendations",
  "keywordSuggestions": ["keyword1", "keyword2", ...],
  "skillsToHighlight": ["skill1", "skill2", ...],
  "experienceUpdates": [
    {
      "company": "company name",
      "originalBullet": "original text",
      "suggestedBullet": "improved text",
      "reason": "why this change helps"
    }
  ],
  "additionalRecommendations": ["recommendation1", "recommendation2", ...],
  "optimizedSummary": "A rewritten professional summary tailored for this role"
}`
        },
        {
          role: "user",
          content: `Job Description:\n${jobDescription}\n\nCurrent CV:\n${JSON.stringify(currentCV, null, 2)}`
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })

    const suggestions = JSON.parse(completion.choices[0].message.content || '{}')

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Error optimizing CV:', error)
    return NextResponse.json(
      { error: 'Failed to optimize CV. Please try again.' },
      { status: 500 }
    )
  }
}