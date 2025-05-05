import { Star } from "lucide-react";

export default function Estrelas({ nota }: { nota: string }) {
  const avaliacao = parseFloat(nota) / 2;
  const estrelasPreenchidas = Math.floor(avaliacao);
  const estrelaParcial = avaliacao % 1 >= 0.5;
  const estrelasVazias = 5 - estrelasPreenchidas - (estrelaParcial ? 1 : 0);

  return (
    <div className="flex flex-row gap-1">
      {Array.from({ length: estrelasPreenchidas }).map((_, i) => (
        <Star color="#dc2626" key={`filled-${i}`} size={20} fill="#dc2626" />
      ))}
      {estrelaParcial && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <defs>
            <clipPath id="half-left">
              <rect x="0" y="0" width="12" height="24" />
            </clipPath>
            <clipPath id="half-right">
              <rect x="12" y="0" width="12" height="24" />
            </clipPath>
          </defs>
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill="#dc2626"
            stroke="#dc2626"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#half-left)"
          />
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill="#a1a1aa"
            stroke="#a1a1aa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#half-right)"
          />
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill="none"
            stroke="dc2626"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {Array.from({ length: estrelasVazias }).map((_, i) => (
        <Star color="#a1a1aa" fill="#a1a1aa" key={`empty-${i}`} size={20} />
      ))}
    </div>
  );
}
