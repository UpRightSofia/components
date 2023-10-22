import { useState } from 'react'
import { useAccordionButton } from 'react-bootstrap'

function CustomToggle({
    children,
    eventKey,
    valueWhenExpanded,
    expanded,
}: {
    children: any
    eventKey: string
    valueWhenExpanded: string
    expanded: boolean
}) {
    const [collapsed, setCollapsed] = useState(!expanded)
    const decoratedOnClick = useAccordionButton(eventKey)

    const onClickHandler = (e: any) => {
        setCollapsed(!collapsed)
        decoratedOnClick(e)
    }

    return (
        <button onClick={onClickHandler}>
            <span className="fw-bold">{collapsed ? children : valueWhenExpanded}</span>
        </button>
    )
}

export default CustomToggle
