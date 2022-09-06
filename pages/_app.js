import '../styles/global.scss'
import CookieDisclaimer from '@/src/components/CookieDisclaimer'
import Header from '@/components/Header'
import TopMenu from '@/components/TopMenu'
import { Provider, useDispatch } from 'react-redux'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { getUser } from '@/redux/actions/users'
import { setServerI18n_t_fn } from '@/src/utils'
import { useEffect } from 'react'
import { wrapper, store } from '@/redux/store'

function MyApp({ Component, pageProps }) {

    const dispatch = useDispatch()
    const { t } = useTranslation()

    setServerI18n_t_fn(t)

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])
    return (
        <Provider store={store}>
            <div className={'page-container'} dir={t('globals.direction')}>
                <Header />
                <TopMenu />
                <Component {...pageProps} />
                <CookieDisclaimer />
            </div>
        </Provider>
    )
}
// noinspection JSUnusedGlobalSymbols
export default appWithTranslation(wrapper.withRedux(MyApp))