import ResumeSection from './section'

const experiences = [
  {
    role: 'Software Developer (Contract)',
    company: 'Pactle',
    location: 'Noida, UP',
    period: 'Sep. 2025 – Present',
    highlights: [
      'Engineered robust, bidirectional ERP integrations to automate the entire quote-to-cash cycle, ensuring seamless data synchronization between Pactle and client systems.',
      'Developed core backend features for workflow automation, including instant RFQ capture, AI-assisted quote generation, and one-click approvals, directly reducing manual processing time for clients.',
      'Administered and optimized a scalable cloud infrastructure on AWS, maintaining high availability and ensuring robust performance for the SaaS platform.',
      'Collaborated on building a unified dashboard to provide clients with real-time visibility into quotes, orders, and payments, centralizing post-sales management.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'Orangewood Labs (Y Combinator 2018)',
    location: 'Noida, UP',
    period: 'Sep. 2023 – Present',
    highlights: [
      'Led development of RoboGPT web application that simplified robotic arm programming for non-technical users, reducing training time by 60% and expanding client adoption by 35%',
      'Engineered a web application for robotic arm control that reduced operational setup time by 40% and improved precision by 25%, utilizing real-time 3D visualization with gRPC and WebSockets',
      'Developed and deployed client-specific robotic control systems for Cashify and Radiant Anodizers, resulting in 30% production efficiency increase and securing $90k in additional contracts',
      'Optimized the company website performance by 50%, implementing modern web technologies that improved SEO rankings by 15 positions and increased lead generation by 25%',
    ],
  },
]

export default function ResumeExperience() {
  return (
    <ResumeSection title="Professional Experience" id="experience">
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="space-y-3">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
              <div>
                <h3 className="font-semibold text-base">{exp.role}</h3>
                <p className="text-sm text-muted-foreground">
                  {exp.company} • {exp.location}
                </p>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                {exp.period}
              </p>
            </div>
            <ul className="space-y-2">
              {exp.highlights.map((highlight, i) => (
                <li key={i} className="flex gap-3 text-xs md:text-sm text-muted-foreground">
                  <span className="text-primary flex-shrink-0 mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ResumeSection>
  )
}
