const setServerI18n_t_fn = (t) => {
    if (process) {
        if (!process['t']) process['t'] = {}
        process['t'][t('globals.locale')] = t
    }
}

export default setServerI18n_t_fn