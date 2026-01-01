// ATS keyword optimization utilities

export interface KeywordAnalysis {
  presentKeywords: string[]
  missingKeywords: string[]
  suggestions: string[]
  score: number
}

// Common tech keywords and their variations for 2025
const KEYWORD_VARIATIONS: Record<string, string[]> = {
  'typescript': ['TypeScript', 'TS', 'typescript'],
  'javascript': ['JavaScript', 'JS', 'javascript', 'ECMAScript'],
  'react': ['React', 'React.js', 'ReactJS'],
  'nextjs': ['Next.js', 'NextJS', 'Next'],
  'nodejs': ['Node.js', 'NodeJS', 'Node'],
  'api': ['API', 'REST API', 'RESTful API', 'REST APIs'],
  'database': ['database', 'databases', 'DB', 'database design'],
  'sql': ['SQL', 'MySQL', 'PostgreSQL', 'NoSQL'],
  'aws': ['AWS', 'Amazon Web Services'],
  'docker': ['Docker', 'containerization', 'containers'],
  'kubernetes': ['Kubernetes', 'K8s'],
  'cicd': ['CI/CD', 'continuous integration', 'continuous deployment'],
  'agile': ['Agile', 'Scrum', 'agile methodology'],
  'testing': ['testing', 'unit testing', 'integration testing', 'test-driven development', 'TDD'],
  'security': ['security', 'secure coding', 'authentication', 'authorization'],
  'performance': ['performance', 'optimization', 'scalability', 'performance optimization'],
  'mobile': ['mobile', 'React Native', 'mobile development'],
  'fullstack': ['full-stack', 'full stack', 'fullstack'],
  'frontend': ['frontend', 'front-end', 'front end'],
  'backend': ['backend', 'back-end', 'back end'],
  'devops': ['DevOps', 'dev ops', 'infrastructure'],
  'cloud': ['cloud', 'cloud computing', 'cloud services'],
  'microservices': ['microservices', 'micro-services', 'service-oriented'],
  'ai': ['AI', 'artificial intelligence', 'machine learning', 'ML', 'automation'],
  'communication': ['communication', 'collaboration', 'team player', 'interpersonal skills'],
  'leadership': ['leadership', 'mentoring', 'lead', 'senior'],
}

// Extract keywords from text
export const extractKeywords = (text: string): string[] => {
  // Convert to lowercase for comparison
  const lowerText = text.toLowerCase()

  // Extract technical terms (words with capital letters, acronyms, technical patterns)
  const technicalTerms = text.match(/\b[A-Z][a-zA-Z]*\.?[a-zA-Z]*\b/g) || []

  // Extract common technical patterns
  const patterns = [
    /\b\w+\.js\b/gi,  // React.js, Node.js, etc.
    /\b[A-Z]{2,}\b/g,  // Acronyms like API, SQL, AWS
    /\b\w+\+\+\b/gi,   // C++, etc.
    /\b\w+#\b/gi,      // C#, F#
    /\b\d+\+?\s*years?\b/gi, // Experience years
  ]

  let keywords: string[] = [...technicalTerms]

  patterns.forEach(pattern => {
    const matches = text.match(pattern) || []
    keywords = keywords.concat(matches)
  })

  // Add variations for common keywords
  Object.entries(KEYWORD_VARIATIONS).forEach(([key, variations]) => {
    variations.forEach(variation => {
      if (lowerText.includes(variation.toLowerCase())) {
        keywords.push(variation)
      }
    })
  })

  // Remove duplicates and clean up
  return [...new Set(keywords)]
    .filter(k => k.length > 1)
    .map(k => k.trim())
}

// Analyze CV against job description
export const analyzeCVAgainstJob = (cvText: string, jobDescription: string): KeywordAnalysis => {
  const cvKeywords = extractKeywords(cvText)
  const jobKeywords = extractKeywords(jobDescription)

  const cvKeywordsLower = cvKeywords.map(k => k.toLowerCase())
  const jobKeywordsLower = jobKeywords.map(k => k.toLowerCase())

  // Find present and missing keywords
  const presentKeywords: string[] = []
  const missingKeywords: string[] = []

  jobKeywords.forEach((keyword, index) => {
    const lowerKeyword = jobKeywordsLower[index]
    let found = false

    // Check for exact match
    if (cvKeywordsLower.includes(lowerKeyword)) {
      presentKeywords.push(keyword)
      found = true
    } else {
      // Check for variations
      Object.entries(KEYWORD_VARIATIONS).forEach(([key, variations]) => {
        if (!found && variations.some(v => v.toLowerCase() === lowerKeyword)) {
          // Check if any variation is in CV
          if (variations.some(v => cvKeywordsLower.includes(v.toLowerCase()))) {
            presentKeywords.push(keyword)
            found = true
          }
        }
      })
    }

    if (!found) {
      missingKeywords.push(keyword)
    }
  })

  // Calculate ATS score (percentage of job keywords present)
  const score = jobKeywords.length > 0
    ? Math.round((presentKeywords.length / jobKeywords.length) * 100)
    : 100

  // Generate suggestions
  const suggestions = generateSuggestions(missingKeywords, cvText)

  return {
    presentKeywords: [...new Set(presentKeywords)],
    missingKeywords: [...new Set(missingKeywords)],
    suggestions,
    score
  }
}

// Generate suggestions for missing keywords
const generateSuggestions = (missingKeywords: string[], cvText: string): string[] => {
  const suggestions: string[] = []

  missingKeywords.forEach(keyword => {
    const lowerKeyword = keyword.toLowerCase()

    // Check if it's a technology/skill
    if (isTechnicalKeyword(keyword)) {
      suggestions.push(`Add "${keyword}" to your skills section if you have experience with it`)
    }

    // Check for experience-related keywords
    if (lowerKeyword.includes('year') || lowerKeyword.includes('experience')) {
      suggestions.push(`Specify years of experience in your summary or role descriptions`)
    }

    // Check for soft skills
    if (['leadership', 'communication', 'collaboration', 'mentor'].some(skill =>
      lowerKeyword.includes(skill))) {
      suggestions.push(`Include examples of ${keyword} in your experience descriptions`)
    }

    // Check for methodologies
    if (['agile', 'scrum', 'kanban', 'waterfall'].some(method =>
      lowerKeyword.includes(method))) {
      suggestions.push(`Mention ${keyword} methodology experience if applicable`)
    }
  })

  // General suggestions
  if (missingKeywords.length > 5) {
    suggestions.push('Consider tailoring your CV more closely to the job description')
  }

  if (!cvText.toLowerCase().includes('result') && !cvText.toLowerCase().includes('achieve')) {
    suggestions.push('Include quantifiable results and achievements in your experience')
  }

  return [...new Set(suggestions)]
}

// Check if a keyword is technical
const isTechnicalKeyword = (keyword: string): boolean => {
  const technicalPatterns = [
    /\.js$/i,
    /^[A-Z]{2,}$/,
    /#$/,
    /\+\+$/,
    /^(react|node|next|vue|angular|python|java|swift|kotlin|go|rust)/i
  ]

  return technicalPatterns.some(pattern => pattern.test(keyword))
}

// Format CV text for analysis
export const formatCVForAnalysis = (cvData: any): string => {
  const sections = [
    cvData.summary,
    cvData.skills.join(', '),
    ...cvData.experience.flatMap((exp: any) => [
      `${exp.title} ${exp.company}`,
      ...exp.responsibilities
    ]),
    ...cvData.education.map((edu: any) => `${edu.degree} ${edu.institution}`)
  ]

  return sections.join('\n')
}