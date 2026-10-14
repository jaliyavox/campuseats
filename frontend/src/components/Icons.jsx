export function LogoIcon() {
    return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16 2 29 9v14l-13 7-13-7V9z" fill="#0d0c14" />
            <path d="M16 2 29 9l-13 7L3 9z" fill="#3a3746" />
            <path d="M16 16v14l13-7V9z" fill="#1d1b27" />
        </svg>
    );
}

export function Cursor({ className }) {
    return (
        <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
            <path d="M2 2l15 6-6.5 2.2L8 17z" fill="#0d0c14" />
        </svg>
    );
}

export function SearchIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
        </svg>
    );
}

export function GitHubIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z" />
        </svg>
    );
}
