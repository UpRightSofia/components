import classes from './Header.module.scss'

const Header = ({ children, className }: { children: any; className?: string }) => {
    return <div className={[classes.Header, className].join(' ')}>{children}</div>
}

export default Header
