'use client';

import React, { useState } from 'react';
import { margin, operators, size } from '../data/operators.jsx';
import { Eye } from 'lucide-react';

export default function Operator({ title, itemId, fill, height, width, components, isCustom, symbol, style = {} }) {
    const [isXRayMode, setIsXRayMode] = useState(false); // X-ray mode to show all components of a custom gate

    return <div style={{ ...style }} className="group relative">
        <svg
            className={`z-40 absolute top-0 left-0 ${(isXRayMode) && 'scale-95'}`}
            height={isXRayMode
                ? (Math.max(...components.map((c) => c.y)) - Math.min(...components.map((c) => c.y)) + 1) * (size + margin.y) - margin.y
                : height * size + margin.y * (height - 1)}
            width={isXRayMode
                ? (Math.max(...components.map((c) => c.x)) - Math.min(...components.map((c) => c.x)) + 1) * (size + margin.x) - margin.x
                : size}
            overflow="visible"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                fill={isXRayMode ? '#f0f4ff' : fill}
                stroke={isXRayMode ? fill : undefined}
                strokeWidth={isXRayMode ? 2 : undefined}
                height={isXRayMode
                    ? (Math.max(...components.map((c) => c.y)) - Math.min(...components.map((c) => c.y)) + 1) * (size + margin.y) - margin.y
                    : height * size + (height - 1) * margin.y}
                rx="4"
                width={isXRayMode
                    ? (Math.max(...components.map((c) => c.x)) - Math.min(...components.map((c) => c.x)) + 1) * (size + margin.x) - margin.x
                    : size}
                x="0"
                y="0"
            />
            {isXRayMode
                ? components.map((comp, idx) => {
                    const op = operators.find(o => o.id === comp.gateId);
                    return (
                        <g key={idx} transform={`translate(${comp.x * (size + margin.x)}, ${comp.y * (size + margin.y)})`}>
                            <rect
                                fill={op?.fill || '#ccc'}
                                height={comp.h * size + (comp.h - 1) * margin.y}
                                width={comp.w * size + (comp.w - 1) * margin.x}
                                rx="4"
                                x="0"
                                y="0"
                            />
                            {op?.icon}
                        </g>
                    );
                })
                : <>{symbol}</>}
        </svg>
        {isCustom && <button
            aria-label="Toggle X-Ray Mode"
            className={`${!isXRayMode && 'group-hover:block hidden'} relative top-0 left-0 bg-white cursor-pointer border border-gray-300 z-50 rounded-full shadow -translate-1/2`}
            onClick={(e) => {
                e.stopPropagation();
                setIsXRayMode(!isXRayMode)
            }}
            style={{ width: 18, height: 18, minWidth: 0, padding: 0, zIndex: 100 }}
        >
            {isXRayMode ? <Eye size={14} color='lightblue' /> : <Eye size={14} />}
        </button>}
    </div>
}