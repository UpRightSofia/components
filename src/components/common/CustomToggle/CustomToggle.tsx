import { useState } from 'react'
import { Button, useAccordionButton } from 'react-bootstrap'

function CustomToggle({
    children,
    eventKey,
    valueWhenExpanded,
}: {
    children: any
    eventKey: string
    valueWhenExpanded: string
}) {
    const [collapsed, setCollapsed] = useState(true)
    const decoratedOnClick = useAccordionButton(eventKey)

    const onClickHandler = (e: any) => {
        setCollapsed(!collapsed)
        decoratedOnClick(e)
    }

    return (
        <Button variant="primary" onClick={onClickHandler}>
            {collapsed ? children : valueWhenExpanded}
        </Button>
    )
}

export default CustomToggle
