"use client";
import React from 'react';
import { useState } from 'react';
import entityLookup from './const';
import HighlightSpan from './HighlightSpan';

const getElements = (text, entities) => {
    let elements = [];
    let mainOffset = 0
    entities.forEach(({ label, offset, length }) => {
        let end = offset + length
        if (offset !== 0) {
            const fragment = text.slice(mainOffset, offset)
            elements.push(fragment)
        }
        const entity = text.slice(offset, end)
        const attrs = entityLookup[label];
        elements.push({
            text: entity,
            label: attrs.label,
            color: attrs.color,
            icon: attrs.icon
        })
        mainOffset = end
    })
    elements.push(text.slice(mainOffset, text.length));
    return elements;
}


export default function EntityPage({ text, entities}) {
    const [isAnnotating, setIsAnnotating] = useState(false);
    const [elements, setElements] = useState(getElements(text, entities));

    console.log(elements)
    
    const handleHighlight = ({i, start, middle, end}) => {
        // replace element i with three elements using splice
        const newElements = [...elements];
        newElements.splice(i, 1, start, middle, end);
        setElements(newElements);
    }

    return (
        <div className='flex items-center justify-center'>
            {elements.map((element, i) => {
                if (typeof element === 'string') {
                    // return <span key={i}>{element}</span>
                    return <HighlightSpan key={i} i={i} text={element} handleHighlight={handleHighlight}/>
                } else {
                    return (
                        <div key={i} className={`flex items-center justify-center mx-1 p-1 ${element.color} text-black font-bold`}>
                            <p>{element.text}</p>
                            <element.icon size={24} className="w-6 h-6 ml-1" />
                        </div>
                    )
                }
            })}
        </div>
    );
}