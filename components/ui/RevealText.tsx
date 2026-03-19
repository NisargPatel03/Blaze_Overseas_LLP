"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { splitByWords } from "@/utils/splitText";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function RevealText({ text, className = "", delay = 0, tag: Tag = 'h2' }: RevealTextProps) {
  const { ref, isVisible } = useScrollReveal();
  const words = splitByWords(text);

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 -mb-1">
          <span
            className="inline-block whitespace-pre opacity-0 translate-y-[110%]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(110%)",
              transition: `opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)`,
              transitionDelay: `${delay + i * 0.07}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
