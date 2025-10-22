import Link from "next/link";

import { SiGithub } from '@icons-pack/react-simple-icons';
import { SiX } from '@icons-pack/react-simple-icons';
import { getPayload } from "payload";
import config from "@/payload.config";

function getIcon(iconName?: string) {
  if (!iconName) return null;
  switch (iconName.toLowerCase()) {
    case 'github':
      return <SiGithub aria-label="GitHub" />;
    case 'x':
    case 'twitter':
      return <SiX aria-label="X" />;
    default:
      return null;
  }
}

export default async function SocialLinks() {
  const payload = await getPayload({
    config: config,
  });
 const { docs: socialLinks } = await payload.find({
    collection: 'social-links',
  });

  console.log(socialLinks);

  return (
    <div className="flex gap-4 mb-12">
      {socialLinks.map((socialLink) => (
        <Link
          key={socialLink.id}
          href={socialLink.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={socialLink.platform}
        >
          {getIcon(socialLink['si-icon-name'] || socialLink.platform)}
        </Link>
      ))}
    </div>
  )
}