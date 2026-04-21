import Link from "next/link";
import { psychologistBranding } from "@/lib/branding";
import type { AppDictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";
import InstagramIcon from "./instagram-icon";

export default function AuthorAttribution({
  locale,
  dict,
  variant,
}: {
  locale: Locale;
  dict: AppDictionary;
  variant: "home" | "result";
}) {
  const role =
    variant === "home"
      ? undefined
      : dict.common.author.consultHint;

  const roleLabel =
    locale === "ru" ? psychologistBranding.roleRu : psychologistBranding.roleEn;

  const name =
    locale === "ru" ? psychologistBranding.displayName : "Veronika Oleynikova";

  return (
    <div className="authorCard">
      <div className="authorTitle">
        {variant === "home" ? dict.home.authorCard.title : dict.result.author.title}
      </div>

      <div className="authorBody">
        <span>
          {dict.common.author.preparedBy} {roleLabel}{" "}
          <strong>{name}</strong>
        </span>
        {role ? <span className="authorHint">{role}</span> : null}
      </div>

      <div className="authorLinks">
        <span className="authorLabel">{dict.common.author.instagram}</span>
        <Link
          className="authorLink"
          href={psychologistBranding.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon title="Instagram" />
          {psychologistBranding.instagramHandle}
        </Link>
      </div>
    </div>
  );
}

