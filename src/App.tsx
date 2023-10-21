import classes from './App.module.scss'
import PickUp from './components/PickUp/PickUp'
import Stats from './components/Stats/Stats'
import WinningResult from './components/WinningResult/WinningResult'

function App() {
    return (
        <div className={classes.App}>
            <WinningResult />
            <PickUp />
            <Stats />
        </div>
    )
}

export default App
