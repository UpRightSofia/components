import classes from './App.module.scss'
import PickUp from './components/PickUp/PickUp'
import WinningResult from './components/WinningResult/WinningResult'

function App() {
    return (
        <div className={classes.App}>
            {/* <WinningResult /> */}
            <PickUp />
        </div>
    )
}

export default App
