import React from 'react';

type Props = {
  fromHotId: string;
  toMessageId: string;
  fromPosition: DOMRect; // Hot balonunun pozisyonu
  toPosition: DOMRect;   // Reply edilen balonun pozisyonu
};

export default function ReplyThreadLink({ fromHotId, toMessageId, fromPosition, toPosition }: Props) {
  return (
    <svg className="absolute left-0 top-0 pointer-events-none z-10 w-full h-full overflow-visible">
      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L6,3 z" fill="rgba(100,100,255,0.6)" />
        </marker>
      </defs>
      <line
        x1={fromPosition.x}
        y1={fromPosition.y}
        x2={toPosition.x}
        y2={toPosition.y}
        stroke="rgba(100, 100, 255, 0.6)"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
}
