export default function ResumeHeader() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Tushar Gaurav</h1>
        <p className="text-base md:text-lg text-primary font-medium mt-1">
          Full Stack Software Engineer
        </p>
      </div>

      {/* Navigation - Desktop Only */}
      <nav className="hidden md:flex flex-col gap-4 pt-4 border-t border-border">
        <a
          href="#about"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          About
        </a>
        <a
          href="#experience"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Experience
        </a>
        <a
          href="#skills"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skills
        </a>
      </nav>
    </div>
  )
}
