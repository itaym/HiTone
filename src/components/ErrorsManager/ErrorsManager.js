import ErrorElement from '@/components/ErrorElement'
import styles from './ErrorsManager.module.scss'
import { useSelector } from 'react-redux'

const ErrorsManager = () => {
    const errors = useSelector(({ errors }) => errors)

    return (
        <div className={styles.errorsManager}>
            {errors.map((error) => <ErrorElement error={error} key={`${error}`} />)}
        </div>
    )
}

export default ErrorsManager