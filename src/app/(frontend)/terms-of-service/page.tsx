import type { Metadata } from 'next'
import { Page, PageTitle, Paragraph, Subtitle } from '@/components/page'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service',
}

export default function TermsOfService() {
  return (
    <Page>
      <PageTitle>Terms of Service</PageTitle>
      <Paragraph className="italic">
        Last Updated: When my lawyer friend told me I should probably have this
      </Paragraph>

      <Paragraph>
        Welcome to my little corner of the internet. These are the terms for using tushgaurav.com. I
        know nobody actually reads these, but here we are anyway.
      </Paragraph>

      <Subtitle>The Basic Deal</Subtitle>
      <Paragraph>
        You can browse this website, read my blog posts, check out my projects, and generally poke
        around. In exchange, you agree not to be a jerk. That's basically it.
      </Paragraph>

      <Subtitle>What You Can Do</Subtitle>
      <ul className="list-disc pl-4">
        <li>Read everything on this site</li>
        <li>Share links to my content on social media</li>
        <li>Use code snippets from my tutorials for your own projects</li>
        <li>Send me feedback, suggestions, or pictures of your cat</li>
        <li>Download any resources I've explicitly made available</li>
      </ul>

      <Subtitle>What You Absolutely Cannot Do</Subtitle>
      <ul className="list-disc pl-4">
        <li>Try to hack the website (seriously, I'm barely keeping it online as is)</li>
        <li>Scrape content to republish it as your own</li>
        <li>Use my name or brand to scam people</li>
        <li>Upload malicious code or try to break stuff</li>
        <li>Spam the contact form with "I can increase your SEO ranking" emails</li>
        <li>Impersonate me (why would you even want to?)</li>
      </ul>
      <Paragraph>
        Basically, don't do anything that would make me regret putting stuff on the internet.
      </Paragraph>

      <Subtitle>Intellectual Property</Subtitle>
      <Paragraph>
        Everything on this site – the writing, the projects, the terrible jokes – is created by me
        (Tushar Gaurav) unless stated otherwise. I own it, or I have permission to use it.
      </Paragraph>
      <Paragraph>
        <span className="font-bold">My Code/Projects:</span> Most of my open-source projects have
        their own licenses (usually GPLv3, yeah copyleft). Check the specific repository for
        details. If I share a code snippet in a blog post, feel free to use it – you don't need to
        ask permission. Just don't be the person who copies an entire tutorial word-for-word and
        claims they wrote it.
      </Paragraph>
      <Paragraph>
        <span className="font-bold">Other People's Stuff:</span> Sometimes I reference or embed
        things from other creators. Those still belong to those creators. I'm just sharing because
        they're cool.
      </Paragraph>

      <Subtitle>Liability - The "Don't Sue Me" Section</Subtitle>
      <Paragraph>
        This website is provided "as is." I try to keep information accurate and up-to-date, but I'm
        human and I make mistakes. Sometimes code examples have bugs. Sometimes I forget to update
        old blog posts. Sometimes Mercury is in retrograde and everything breaks.
      </Paragraph>
      <Paragraph>
        If you follow a tutorial and something breaks: I'll help if I can, but I'm not responsible
        for your production server going down because you copy-pasted code without testing it first.
        Always test things properly.
      </Paragraph>
      <Paragraph>
        If you click an external link: I don't control other websites. If you click a link and end
        up somewhere weird, that's not on me.
      </Paragraph>
      <Paragraph>
        <span className="font-bold">General Disclaimer:</span> I'm not liable for any damages,
        losses, or existential crises resulting from using this website. Use common sense.
      </Paragraph>

      <Subtitle>Comments and User Generated Content</Subtitle>
      <Paragraph>If I ever add a comment section (big if), here's the deal:</Paragraph>
      <ul className="list-disc pl-4">
        <li>Be respectful. Disagree all you want, but don't be abusive.</li>
        <li>No spam, no illegal stuff, no harassment.</li>
        <li>I reserve the right to delete comments that violate these rules.</li>
        <li>You retain ownership of your comments, but you give me permission to display them.</li>
      </ul>

      <Subtitle>External Links</Subtitle>
      <Paragraph>
        I sometimes link to other websites, resources, or tools I find useful. I don't control those
        sites and I'm not responsible for their content. Clicking links is at your own risk.
      </Paragraph>

      <Subtitle>Changes to These Terms</Subtitle>
      <Paragraph>
        I might update these terms occasionally. Maybe I'll add a new feature. Maybe I'll finally
        add that comment section. Maybe lawyers will tell me I forgot something important.
      </Paragraph>
      <Paragraph>
        If I make significant changes, I'll update the date at the top. By continuing to use the
        site after changes are posted, you accept the new terms. If you don't like the new terms,
        well, the internet is a big place.
      </Paragraph>

      <Subtitle>Termination</Subtitle>
      <Paragraph>
        I reserve the right to block access to anyone abusing the website or violating these terms.
        Though honestly, I'd probably just send a confused email asking why you're trying to break
        my site first.
      </Paragraph>

      <Subtitle>Governing Law</Subtitle>
      <Paragraph>
        This website is operated from India by an Indian citizen (me). These terms are governed by
        Indian law. If we somehow end up in a legal dispute over my personal website, something has
        gone terribly wrong for both of us.
      </Paragraph>

      <Subtitle>Account Suspension</Subtitle>
      <Paragraph>
        If I ever add user accounts: I can suspend or terminate accounts that violate these terms.
        I'll usually warn you first unless you're doing something really egregious.
      </Paragraph>

      <Subtitle>Questions or Problems?</Subtitle>
      <Paragraph>
        If you think I messed something up, or if you have questions about these terms, just contact
        me. I'm approachable. I don't have a legal team. It's literally just me responding to emails
        between debugging sessions. Use the contact form and I'll get back to you.
      </Paragraph>

      <Subtitle>TL;DR</Subtitle>
      <Paragraph>
        Be cool, don't break stuff, don't steal content, and we'll get along fine. I'm just here to
        share projects and maybe teach some people something useful. That's the whole deal.
      </Paragraph>
    </Page>
  )
}
