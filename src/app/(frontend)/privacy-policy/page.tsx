import type { Metadata } from 'next'
import { Page, PageTitle, Paragraph, Subtitle } from '@/components/page'
import Hedgehog from '@/components/extras/hedgehog'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy',
}

export default function PrivacyPolicy() {
  return (
    <Page>
      <Hedgehog />
      <PageTitle>Privacy Policy</PageTitle>

      <Paragraph>
        Look, I'm just a guy who likes to build stuff and share it with the internet. This isn't
        Facebook or Google – I'm not sitting here plotting elaborate schemes to monetize your data.
        But since we live in a world where I apparently need to tell you I'm not doing shady stuff,
        here we go.
      </Paragraph>

      <Subtitle>What I Collect (Spoiler: Not Much)</Subtitle>

      <Paragraph>
        <span className="font-bold">Analytics:</span> I use basic website analytics to see which
        pages people actually visit. It's mostly so I don't waste time writing blog posts nobody
        reads. This tells me stuff like "someone from India visited your homepage" but not "Rahul
        from Noida who likes biryani visited your homepage."
      </Paragraph>

      <Paragraph>
        <span className="font-bold">Contact Forms:</span> If you fill out a contact form, yeah, I'm
        gonna have your email and whatever message you sent. That's kind of how contact forms work.
        I use this to, you know, contact you back. Revolutionary concept, I know.
      </Paragraph>

      <Subtitle>What I Don't Do With Your Data</Subtitle>
      <ul className="list-disc pl-4">
        <li>Sell it to sketchy data brokers</li>
        <li>Share it with my "637 partners" (looking at you, literally every website)</li>
        <li>Use it for targeted advertising</li>
        <li>Train AI models to impersonate you</li>
        <li>Literally anything evil</li>
      </ul>
      <Paragraph>
        I mainly use your data to... improve the website? Send you replies? Be a normal human being
        running a normal website?
      </Paragraph>

      <Subtitle>Cookies and Tracking</Subtitle>
      <Paragraph>
        I use cookies for basic functionality. No third-party ad trackers, no surveillance
        capitalism nonsense. Just the boring technical cookies that make websites work. Your browser
        probably accepts these automatically anyway.
      </Paragraph>

      <Subtitle>Your Rights</Subtitle>
      <Paragraph>You can email me anytime to:</Paragraph>
      <ul className="list-disc pl-4">
        <li>
          Ask what data I have on you (probably just your email from that one time you contacted me)
        </li>
        <li>Request I delete it</li>
        <li>Tell me my website broke something</li>
        <li>Share memes</li>
        <li>Just shoot me a message through the contact form.</li>
      </ul>

      <Subtitle>Changes to this Policy</Subtitle>
      <Paragraph>
        If I ever need to change this policy, I'll update the date at the top and probably mention
        it somewhere. But honestly, unless I accidentally become a tech giant overnight, this policy
        will probably stay the same forever.
      </Paragraph>

      <Subtitle>The Legal Stuff</Subtitle>
      <Paragraph>
        This website is operated by Tushar Gaurav from India. I comply with applicable laws because,
        you know, I'm not trying to go to jail over a personal website.
      </Paragraph>
      <Paragraph>
        If you're from the EU, congrats on GDPR – it's why every website has annoying cookie banners
        now. You have all those fancy GDPR rights. If you're from California, you've got CCPA rights
        too. If you're from anywhere else, I'll still respect your privacy because I'm not a
        monster.
      </Paragraph>

      <Paragraph className="italic mt-8">
        <span className="font-bold">P.S. -</span> I built this website to share projects and maybe
        help some people learn stuff. That's it. That's the business model. If you think I'm doing
        something sketchy with your data, you're giving me way too much credit for having time to do
        sketchy things.
      </Paragraph>
    </Page>
  )
}
