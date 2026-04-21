export default function InstagramIcon({ title }: { title?: string }) {
  return (
    <svg
      className="igIcon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M7.5 2.5h9A5 5 0 0 1 21.5 7.5v9a5 5 0 0 1-5 5h-9a5 5 0 0 1-5-5v-9a5 5 0 0 1 5-5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.5a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M17.25 6.75h.01"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

