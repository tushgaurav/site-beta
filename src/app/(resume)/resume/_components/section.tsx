interface ResumeSectionProps {
  title: string
  children: React.ReactNode
  id?: string
}

export default function ResumeSection({ title, children, id }: ResumeSectionProps) {
  return (
    <section id={id} className="space-y-4">
      <h2 className="text-lg md:text-xl font-semibold border-b border-primary pb-2 uppercase tracking-wide">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  )
}
