import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { CVData } from '../../../utils/cvTypes'

// Initialize OpenAI with latest model support
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Model configuration - ready for GPT-5 when available
// TODO: Update to "gpt-5" when OpenAI releases it
// For now using the most advanced available model
const AI_MODEL = "gpt-4-turbo-preview"

export async function POST(request: NextRequest) {
  try {
    const { jobDescription, currentCV }: { jobDescription: string; currentCV: CVData } = await request.json()

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-api-key-here') {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add your API key to .env.local' },
        { status: 500 }
      )
    }

    // Extract existing skills for validation
    const existingSkills = new Set(currentCV.skills.map(s => s.toLowerCase()))

    const completion = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an expert resume consultant. Analyse the job description and the current CV, then provide specific suggestions to optimise the CV for this role.

CRITICAL RULES:
1. NEVER suggest skills that don't already exist in the CV. You can only reorder or emphasise existing skills.
2. NEVER make up experiences or responsibilities. Only suggest rewording existing content.
3. Keywords must be derived from the candidate's actual experience and skills.
4. Focus on alignment and presentation, not invention.
5. ALWAYS use Australian English spelling and terminology (e.g., "optimise" not "optimize", "analyse" not "analyze", "organisation" not "organization", "realise" not "realize", "centre" not "center", "colour" not "color", "programme" for computer programs, "specialise" not "specialize").

Current skills in CV: ${currentCV.skills.join(', ')}

Provide suggestions for:
1. Which existing keywords from the CV align with the job description
2. How to reorder existing skills for better alignment
3. How to rewrite existing experience bullets to emphasise relevant achievements (using only factual information)
4. How to adjust the professional summary using only existing qualifications

Return your response as a JSON object with this structure:
{
  "summary": "Brief overview of alignment recommendations",
  "keywordSuggestions": ["only keywords already in CV that match job description"],
  "skillsToHighlight": ["only skills from existing CV skills list"],
  "experienceUpdates": [
    {
      "company": "company name",
      "originalBullet": "exact original text",
      "suggestedBullet": "reworded version emphasising relevant aspects",
      "reason": "why this rewording helps alignment"
    }
  ],
  "additionalRecommendations": ["recommendations for presentation/formatting only"],
  "optimisedSummary": "Rewritten summary using only existing qualifications and experiences"
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
    console.error('Error optimising CV:', error)
    return NextResponse.json(
      { error: 'Failed to optimise CV. Please try again.' },
      { status: 500 }
    )
  }
}