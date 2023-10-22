import { Accordion, Card } from 'react-bootstrap'
import CustomToggle from '../CustomToggle/CustomToggle'
import Picks from '../../Picks/Picks'
import classes from './More.module.scss'

const More = ({
    picks,
    specialNumbersCount,
    className,
    expanded,
}: {
    picks: {
        numbers: number[]
        prize?: number
    }[]
    specialNumbersCount: number
    className?: string
    expanded?: boolean
}) => {
    return (
        <Accordion
            defaultActiveKey={expanded ? '0' : '1'}
            className={[classes.More, className].join(' ')}
        >
            <Card className="border-0">
                <Card.Header className="border-0 bg-white">
                    <CustomToggle eventKey="0" valueWhenExpanded="Show less">
                        Show more
                    </CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Picks
                            userPicks={picks}
                            numbers={Array(picks[0]?.numbers.length).fill(0)}
                            specialNumbersCount={specialNumbersCount}
                        />
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default More
