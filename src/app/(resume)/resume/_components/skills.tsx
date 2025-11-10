import ResumeSection from './section'

const skillCategories = [
  {
    category: 'Programming Languages',
    skills: ['Python', 'JavaScript/TypeScript'],
  },
  {
    category: 'Frontend',
    skills: ['React.js', 'Next.js', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    skills: [
      'FastAPI',
      'Node.js',
      'Deno',
      'Express.js',
      'Prisma',
      'Drizzle',
      'PostgreSQL',
      'MongoDB',
    ],
  },
  {
    category: 'AI',
    skills: ['LLM Integration', 'Fine Tuning', 'Agents'],
  },
  {
    category: 'DevOps & Cloud',
    skills: ['AWS', 'Azure', 'Docker', 'Linux', 'Git', 'CI/CD', 'Proxmox', 'Ansible'],
  },
  {
    category: 'Design & Media',
    skills: ['Figma', 'Blender', 'Photoshop', 'Premiere Pro'],
  },
  {
    category: 'Hobbies & Misc',
    skills: ['Arduino', 'Raspberry Pi', '3D Printing', 'Homelab', 'Odoo', 'n8n'],
  },
]

export default function ResumeTechSkills() {
  return (
    <ResumeSection title="Technical Skills" id="skills">
      <div className="space-y-4">
        {skillCategories.map((cat, idx) => (
          <div key={idx}>
            <h4 className="font-medium text-sm mb-2">{cat.category}</h4>
            <p className="text-xs md:text-sm text-muted-foreground">{cat.skills.join(', ')}</p>
          </div>
        ))}
      </div>
    </ResumeSection>
  )
}
