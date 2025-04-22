import { Star, StarHalf } from "lucide-react";

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
        <StarHalf color="#dc2626" fill="#dc2626" key="partial" size={20} />
      )}
      {Array.from({ length: estrelasVazias }).map((_, i) => (
        <Star color="#a1a1aa" fill="#a1a1aa" key={`empty-${i}`} size={20} />
      ))}
    </div>
  );
}
