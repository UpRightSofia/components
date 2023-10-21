import classes from './Separator.module.scss'

const Separator = ({ className }: { className?: string }) => {
    return <hr className={[classes.Separator, className].join(' ')}></hr>
}

export default Separator
