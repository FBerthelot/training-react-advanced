import { useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"

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


    const { isLoading, error, data }  = useQuery(url,  async () => {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error('Request failed')
        }
        return await res.json()
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
            {isLoading && 'chargement...'}
            {error && 'Oopsy...'}
            {data && (
                <ul>
                    <li>Bonheur: {data.base_happiness}</li>
                    <li>Ratio de capture:  {data.capture_rate}</li>
                </ul>
            )}
        </div>
    )
}