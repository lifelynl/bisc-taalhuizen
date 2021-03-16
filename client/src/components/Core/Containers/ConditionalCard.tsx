import classNames from 'classnames'
import styles from './ConditionalCard.module.scss'

interface Props {
    className?: string
    warning?: boolean
}

const InputContainer: React.FunctionComponent<Props> = ({ className, children, warning }) => {
    const containerClassNames = classNames(styles.container, className, {
        [styles.warning]: warning,
    })

    return <div className={containerClassNames}>{children}</div>
}

export default InputContainer
