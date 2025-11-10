import ResumeHeader from './_components/header'
import ResumeSection from './_components/section'
import ResumeExperience from './_components/experience'
import ResumeTechSkills from './_components/skills'
import ResumeFooter from './_components/footer'

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-12 md:gap-8 md:p-12">
        {/* Sidebar */}
        <div className="md:col-span-3">
          <div className="sticky top-12">
            <ResumeHeader />
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-9 space-y-12">
          <ResumeSection title="About">
            <p className="text-base leading-relaxed text-muted-foreground">
              Full Stack Software Engineer with expertise in building scalable systems and intuitive
              user interfaces. Passionate about engineering excellence, cloud infrastructure, and
              creating efficient solutions that solve real business problems.
            </p>
          </ResumeSection>

          <ResumeExperience />
          <ResumeSection title="Education">
            <div className="space-y-4">
              <div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <h4 className="font-semibold">Noida Institute of Engineering and Technology</h4>
                    <p className="text-sm text-muted-foreground">Greater Noida, Uttar Pradesh</p>
                  </div>
                  <p className="text-sm text-muted-foreground whitespace-nowrap">2020 - 2024</p>
                </div>
                <p className="text-sm mt-1">B.Tech in Computer Science Engineering</p>
              </div>
            </div>
          </ResumeSection>

          <ResumeTechSkills />

          <ResumeSection title="Certifications">
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Meta Front-End Developer Professional Certificate</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>
                  Graphic Design & UI/UX Design Specialization, California Institute of the Arts
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>CS50x: Introduction to Computer Science, Harvard University</span>
              </li>
            </ul>
          </ResumeSection>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col">
        <div className="p-6 border-b border-border">
          <ResumeHeader />
        </div>
        <div className="space-y-12 p-6">
          <ResumeSection title="About">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Full Stack Software Engineer with expertise in building scalable systems and intuitive
              user interfaces. Passionate about engineering excellence, cloud infrastructure, and
              creating efficient solutions that solve real business problems.
            </p>
          </ResumeSection>

          <ResumeExperience />
          <ResumeSection title="Education">
            <div className="space-y-4">
              <div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-semibold text-sm">
                    Noida Institute of Engineering and Technology
                  </h4>
                  <p className="text-xs text-muted-foreground">Greater Noida, Uttar Pradesh</p>
                  <p className="text-xs text-muted-foreground">2020 - 2024</p>
                </div>
                <p className="text-xs mt-1">B.Tech in Computer Science Engineering</p>
              </div>
            </div>
          </ResumeSection>

          <ResumeTechSkills />

          <ResumeSection title="Certifications">
            <ul className="space-y-2 text-xs">
              <li className="flex gap-2">
                <span className="text-primary flex-shrink-0">•</span>
                <span>Meta Front-End Developer Professional Certificate</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary flex-shrink-0">•</span>
                <span>
                  Graphic Design & UI/UX Design Specialization, California Institute of the Arts
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary flex-shrink-0">•</span>
                <span>CS50x: Introduction to Computer Science, Harvard University</span>
              </li>
            </ul>
          </ResumeSection>

          <ResumeFooter />
        </div>
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:block border-t border-border mt-12 p-12">
        <ResumeFooter />
      </div>
    </main>
  )
}
