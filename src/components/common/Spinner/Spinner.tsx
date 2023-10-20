import classes from './Spinner.module.scss'

const Spinner = () => {
    return (
        <div className={classes['lds-ellipsis']}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Spinner
