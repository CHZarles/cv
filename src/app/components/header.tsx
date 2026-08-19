import { GlobeIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import type React from "react";
import { Avatar } from "@/components/avatar";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { XIcon } from "@/components/icons/x-icon";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import type { IconType } from "@/lib/types";

// Type-safe icon mapping
const ICON_MAP: Record<
  IconType,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  globe: GlobeIcon,
  mail: MailIcon,
  phone: PhoneIcon,
} as const;

interface LocationLinkProps {
  location: typeof RESUME_DATA.location;
  locationLink: typeof RESUME_DATA.locationLink;
}

function LocationLink({ location, locationLink }: LocationLinkProps) {
  return (
    <p className="max-w-md items-center text-pretty font-mono text-xs text-foreground">
      <a
        className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
        href={locationLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Location: ${location}`}
      >
        <MapPinIcon className="size-3" aria-hidden="true" />
        {location}
      </a>
    </p>
  );
}

interface SocialButtonProps {
  href: string;
  iconType: IconType;
  label: string;
}

function SocialButton({ href, iconType, label }: SocialButtonProps) {
  const IconComponent = ICON_MAP[iconType];

  return (
    <Button className="size-8" variant="outline" size="icon" asChild={true}>
      <a
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconComponent className="size-4" aria-hidden="true" />
      </a>
    </Button>
  );
}

interface ContactButtonsProps {
  contact: typeof RESUME_DATA.contact;
  personalWebsiteUrl?: string;
}

function ContactButtons({ contact, personalWebsiteUrl }: ContactButtonsProps) {
  return (
    <ul
      className="flex list-none gap-x-1 pt-1 font-mono text-sm text-foreground/80 print:hidden"
      aria-label="Contact links"
    >
      {personalWebsiteUrl && (
        <li>
          <SocialButton
            href={personalWebsiteUrl}
            iconType="globe"
            label="Personal website"
          />
        </li>
      )}
      {contact.email && (
        <li>
          <SocialButton
            href={`mailto:${contact.email}`}
            iconType="mail"
            label="Email"
          />
        </li>
      )}
      {contact.tel && (
        <li>
          <SocialButton
            href={`tel:${contact.tel}`}
            iconType="phone"
            label="Phone"
          />
        </li>
      )}
      {contact.social.map((social) => (
        <li key={social.name}>
          <SocialButton
            href={social.url}
            iconType={social.icon}
            label={social.name}
          />
        </li>
      ))}
    </ul>
  );
}

function PrintContact() {
  const { contact, personalWebsiteUrl } = RESUME_DATA;

  return (
    <address className="hidden shrink-0 flex-col items-end gap-1 text-right font-mono text-xs not-italic text-foreground/80 print:flex">
      {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
      {contact.tel && <a href={`tel:${contact.tel}`}>{contact.tel}</a>}
      {personalWebsiteUrl && (
        <a href={personalWebsiteUrl}>{new URL(personalWebsiteUrl).host}</a>
      )}
      {contact.social.map((social) => (
        <a href={social.url} key={social.name}>
          {new URL(social.url).host + new URL(social.url).pathname}
        </a>
      ))}
    </address>
  );
}

/**
 * Header component displaying personal information and contact details
 */
export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex-1 space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight" id="resume-name">
          {RESUME_DATA.name}
        </h1>
        {RESUME_DATA.about && (
          <p className="max-w-md text-pretty font-mono text-sm text-foreground/80">
            {RESUME_DATA.about}
          </p>
        )}

        {RESUME_DATA.location && RESUME_DATA.locationLink && (
          <LocationLink
            location={RESUME_DATA.location}
            locationLink={RESUME_DATA.locationLink}
          />
        )}

        <ContactButtons
          contact={RESUME_DATA.contact}
          personalWebsiteUrl={RESUME_DATA.personalWebsiteUrl}
        />
      </div>

      <Avatar
        className="size-28 ring-1 ring-muted print:hidden"
        src={RESUME_DATA.avatarUrl}
        alt={`${RESUME_DATA.name}'s profile picture`}
        fallback={RESUME_DATA.initials}
      />
      <PrintContact />
    </header>
  );
}
