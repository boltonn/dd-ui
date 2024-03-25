import entityLookup from './const';


export default function EntityPage({ text, entities}) {
    console.log(entities)
    console.log(text)

    let elements = [];
    if (text) {
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
    }
    console.log(elements)
    // return if text is not empty

    return (
        <div className='flex items-center justify-center'>
            {elements.map((element, i) => {
                if (typeof element === 'string') {
                    return <span key={i}>{element}</span>
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