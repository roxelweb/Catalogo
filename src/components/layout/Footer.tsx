import { SITE_CONFIG } from "@data/site";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@components/ui/Icons";
import type { SocialLink } from "@components/types";

export interface FooterProps {
  id?: string;
  title?: string;
  schedule?: string;
  phoneDisplay?: string;
  phoneHref?: string;
  socialHeading?: string;
  socialLinks?: SocialLink[];
  className?: string;
}

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [...SITE_CONFIG.socialLinks];

function renderSocialIcon(platform: SocialLink["platform"]) {
  switch (platform) {
    case "tiktok":
      return <TikTokIcon className="size-10" />;
    case "instagram":
      return <InstagramIcon className="size-10" />;
    case "whatsapp":
      return <WhatsAppIcon className="size-10" />;
  }
}

export function Footer({
  id,
  title = "Contacto",
  schedule = SITE_CONFIG.schedule,
  phoneDisplay = SITE_CONFIG.phoneDisplay,
  phoneHref = SITE_CONFIG.whatsappUrl,
  socialHeading = "Seguinos en nuestras redes sociales",
  socialLinks = DEFAULT_SOCIAL_LINKS,
  className = "",
}: FooterProps) {
  return (
    <footer
      id={id}
      className={`bg-roxel-dark-900 text-roxel-ink-inverse border-t border-roxel-dark-800 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <h2 className="text-lg sm:text-xl font-bold text-roxel-ink-inverse mb-3">
          {title}
        </h2>

        <address className="not-italic">
          <p className="text-xs sm:text-sm text-roxel-ink-inverse-muted mb-3">
            {schedule}
          </p>

          <a
            href={phoneHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-sm font-medium text-roxel-ink-inverse hover:text-roxel-gold-metallic transition-colors rounded-md py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-gold-400"
          >
            <WhatsAppIcon className="size-10 shrink-0" />
            <span>{phoneDisplay}</span>
          </a>
        </address>

        <p className="mt-6 mb-3 text-xs sm:text-sm text-roxel-ink-inverse-muted">
          {socialHeading}
        </p>

        <ul className="flex items-center gap-3">
          {socialLinks.map((link) => {
            const label =
              link.label ??
              (link.platform === "tiktok"
                ? "TikTok"
                : link.platform === "instagram"
                  ? "Instagram"
                  : "WhatsApp");
            return (
              <li key={`${link.platform}-${link.href}`}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center min-w-10 min-h-10 rounded-lg text-roxel-ink-inverse hover:text-roxel-gold-metallic hover:bg-roxel-dark-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-gold-400"
                >
                  {renderSocialIcon(link.platform)}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
