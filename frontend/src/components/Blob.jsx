import { useId } from "react";

const PALETTES = {
    violet: ["#c4b5fd", "#7c3aed", "#3b0a9e"],
    lemon: ["#fdffc2", "#e6ec3a", "#9aa10c"],
};

// Spiky glossy "3D" orb drawn with SVG: a core circle plus rounded spikes,
// all filled with one radial gradient so it reads as a single lit object.
function Blob({ spikes = 11, tone = "violet", className }) {
    const id = useId();
    const [light, mid, dark] = PALETTES[tone];

    const arms = Array.from({ length: spikes }, (_, i) => {
        const angle = (i / spikes) * Math.PI * 2;
        const reach = i % 2 ? 150 : 165;
        return { x: Math.cos(angle) * reach, y: Math.sin(angle) * reach };
    });

    return (
        <svg className={className} viewBox="-210 -210 420 420" aria-hidden="true">
            <defs>
                <radialGradient id={`${id}g`} gradientUnits="userSpaceOnUse" cx="-70" cy="-80" r="300">
                    <stop offset="0" stopColor={light} />
                    <stop offset="0.45" stopColor={mid} />
                    <stop offset="1" stopColor={dark} />
                </radialGradient>
                <radialGradient id={`${id}h`}>
                    <stop offset="0" stopColor="#fff" stopOpacity="0.7" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
            </defs>
            <g fill={`url(#${id}g)`} stroke={`url(#${id}g)`}>
                {arms.map((a, i) => (
                    <g key={i}>
                        <line x1="0" y1="0" x2={a.x} y2={a.y} strokeWidth="44" strokeLinecap="round" />
                        <circle cx={a.x} cy={a.y} r="30" stroke="none" />
                    </g>
                ))}
                <circle r="112" stroke="none" />
            </g>
            {arms.slice(0, 5).map((a, i) => (
                <circle key={i} cx={a.x * 0.55} cy={a.y * 0.55} r="12" fill={dark} opacity="0.35" />
            ))}
            <ellipse cx="-45" cy="-55" rx="60" ry="40" fill={`url(#${id}h)`} />
        </svg>
    );
}

export default Blob;
