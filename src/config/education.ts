export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  start: string
  end: string
  grade?: string
  highlights: string[]
  coursework: string[]
}

export const education: Education[] = [
  {
    id: 'rishihood',
    institution: 'Rishihood University',
    degree: 'Bachelor of Technology',
    field: 'Computer Science & Artificial Intelligence',
    location: 'Haryana, India',
    start: 'Aug 2023',
    end: 'Present',
    grade: '8.5 / 10 CGPA',
    highlights: [
      'GDG on Campus Lead (2024) — led flagship tech events, workshops and community initiatives.',
      'All India Rank 1200 in ICPC Prelims 2023.',
    ],
    coursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Operating Systems',
      'Databases',
      'Computer Networks',
      'Artificial Intelligence',
    ],
  },
]
