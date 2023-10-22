import { useEffect, useState } from 'react'
import classes from './App.module.scss'
import PickUp from './components/PickUp/PickUp'
import WinningResult from './components/WinningResult/WinningResult'
import { ClockFill, HouseFill, TicketFill, TrophyFill } from 'react-bootstrap-icons'
import Header from './components/common/Header/Header'
import { TicketsService } from './services/tickets'
import HistoricalWinnings from './components/HistoricalWinnings/HistoricalWinnings'

enum PageView {
    HOME,
    PICKUP,
    WINNING_RESULT,
    HISTORICAL_WINNINGS,
}

function App() {
    const [state, setState] = useState(PageView.HOME)
    const [totalTickets, setTotalTickets] = useState(0)

    useEffect(() => {
        const load = async () => {
            const res = await TicketsService.getTickets()
            setTotalTickets(res.tickets?.length)
        }
        load()
    }, [state])

    const homeView = () => {
        return (
            <div className={classes.App}>
                <span>LottoLodge</span>
                <Header className={classes.Text}>Total tickets {totalTickets}</Header>
                <div className={classes.Buttons}>
                    <button
                        className={classes.Btn}
                        onClick={() => setState(PageView.WINNING_RESULT)}
                    >
                        <TrophyFill />
                    </button>
                    <button className={classes.Btn} onClick={() => setState(PageView.PICKUP)}>
                        <TicketFill />
                    </button>
                    <button
                        className={classes.Btn}
                        onClick={() => setState(PageView.HISTORICAL_WINNINGS)}
                    >
                        <ClockFill />
                    </button>
                </div>
            </div>
        )
    }

    switch (state) {
        case PageView.HOME:
            return homeView()
        case PageView.PICKUP:
            return (
                <div className={classes.App}>
                    <PickUp />
                    <button
                        className={[classes.Home, classes.Btn].join(' ')}
                        onClick={() => setState(PageView.HOME)}
                    >
                        <HouseFill />
                    </button>
                </div>
            )
        case PageView.WINNING_RESULT:
            return (
                <div className={classes.App}>
                    <WinningResult time={1} showLosing={true} />
                    <button
                        className={[classes.Home, classes.Btn].join(' ')}
                        onClick={() => setState(PageView.HOME)}
                    >
                        <HouseFill />
                    </button>
                </div>
            )
        case PageView.HISTORICAL_WINNINGS:
            return (
                <div className={classes.App}>
                    <HistoricalWinnings />
                    <button
                        className={[classes.Home, classes.Btn].join(' ')}
                        onClick={() => setState(PageView.HOME)}
                    >
                        <HouseFill />
                    </button>
                </div>
            )
        default:
            return homeView()
    }
}

export default App
