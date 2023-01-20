import { useEffect, useRef, useState } from "react"

export const StatsInfobulle = ({
    isOpen,
    url,
    anchorElement
}) => {
    const floatingBoxRef = useRef(null)

    const [floatingBoxRect, setFloatingBoxRect] = useState(undefined)
    const anchorElementRect = anchorElement?.getBoundingClientRect()

    const middleOfAnchorX = anchorElementRect ? anchorElementRect.x + anchorElementRect.width / 2 : 0
    const bottomOfAnchor = anchorElementRect ? anchorElementRect.bottom + 7 : 0
    const floatingBoxWidth = floatingBoxRect?.width ?? 0

    const idealX = middleOfAnchorX - floatingBoxWidth / 2
    const idealY = bottomOfAnchor

    const x = idealX < 0 ? 0 : idealX
    const y = idealY < 0 ? 0 : idealY
    useEffect(() => {
        if (isOpen) {
            setFloatingBoxRect(floatingBoxRef.current?.getBoundingClientRect())
        }
    }, [floatingBoxRef, isOpen])


    const [requestStatus, setRequestStatus] = useState('loading')
    useEffect(() => {
        fetch(url)
            .then((res) => {
                if(!res.ok) {
                    throw new Error('Request failed')
                }
                return res.json()
            })
            .then((data) => {
                setRequestStatus(data)
            })
            .catch(err => {
                console.error(err);
                setRequestStatus('error')
            })
    }, [url])

    if(!isOpen) {
        return;
    }

    return (
        <div
            className="tooltip"
            ref={floatingBoxRef}
            style={{
                left: `${x}px`,
                top: `${y}px`,
            }}
        >
            {requestStatus === 'loading' && 'chargement...'}
            {requestStatus === 'error' && 'Oopsy...'}
            {!['loading', 'error'].includes(requestStatus) && (
                <ul>
                    <li>Bonheur: {requestStatus.base_happiness}</li>
                    <li>Ratio de capture:  {requestStatus.capture_rate}</li>
                </ul>
            )}
        </div>
    )
}