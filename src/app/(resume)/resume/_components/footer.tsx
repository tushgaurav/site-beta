export default function ResumeFooter() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-6">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Last Updated: November 2025</p>
      </div>
      <div className="flex gap-4 md:gap-6">
        <a
          href="https://github.com/tushgaurav"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/tushgaurav/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </div>
  )
}
