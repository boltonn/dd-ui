"use client";
import entityLookup from './const';


export default function HighlightSpan({ i, text, handleHighlight }) {

    const onMouseUpHandler = (e) => {

        e.preventDefault();
        const selectionObj = (window.getSelection && window.getSelection());
        const selection = selectionObj.toString();
        const anchorNode = selectionObj.anchorNode;
        const focusNode = selectionObj.focusNode;
        const anchorOffset = selectionObj.anchorOffset;
        const focusOffset = selectionObj.focusOffset;
        const position = anchorNode.compareDocumentPosition(focusNode);
        let forward = false;

        if (position === anchorNode.DOCUMENT_POSITION_FOLLOWING) {
            forward = true;
        } else if (position === 0) {
            forward = (focusOffset - anchorOffset) > 0;
        }

        let selectionStart = forward ? anchorOffset : focusOffset;

        if (forward) {
            if (anchorNode.parentNode.getAttribute('data-order')
                && anchorNode.parentNode.getAttribute('data-order') === 'middle') {
                selectionStart += selectionStart;
            }
            if (anchorNode.parentNode.getAttribute('data-order')
                && anchorNode.parentNode.getAttribute('data-order') === 'last') {
                selectionStart += selectionEnd;
            }
        } else {
            if (focusNode.parentNode.getAttribute('data-order')
                && focusNode.parentNode.getAttribute('data-order') === 'middle') {
                selectionStart += selectionStart;
            }
            if (focusNode.parentNode.getAttribute('data-order')
                && focusNode.parentNode.getAttribute('data-order') === 'last') {
                selectionStart += selectionEnd;
            }
        }

        const selectionEnd = selectionStart + selection.length;
        const first = text.slice(0, selectionStart);
        const middle = text.slice(selectionStart, selectionEnd);
        const last = text.slice(selectionEnd);
        console.log(handleHighlight)

        const label = 'email';
        const attrs = entityLookup[label];
        const entityElement = {
            text: middle,
            label: attrs.label,
            color: attrs.color,
            icon: attrs.icon
        }
        handleHighlight({ 
            i, 
            start: first, 
            middle: entityElement, 
            end: last 
        });
    }

    return (
        <div onMouseUp={onMouseUpHandler}>
            {text}
        </div>
    )
}