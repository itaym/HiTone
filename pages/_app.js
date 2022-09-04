import '../styles/global.scss'
import { Provider, useDispatch } from 'react-redux'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { getUser } from '@/redux/actions/users'
import { useEffect } from 'react'
import { wrapper, store } from '@/redux/store'

function MyApp({ Component, pageProps }) {

    const dispatch = useDispatch()
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])
    return (
        <Provider store={store}>
            <div className={'page-container'} dir={t('globals.direction')}>
                <Component {...pageProps} />
            </div>
        </Provider>
    )
}
// noinspection JSUnusedGlobalSymbols
export default appWithTranslation(wrapper.withRedux(MyApp))