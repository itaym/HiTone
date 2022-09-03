const setServerI18n_t_fn = (t) => {
    if (process) {
        // noinspection JSUnresolvedVariable
        if (!process.t) process.t = {}
        // noinspection JSUnresolvedVariable
        process.t[t('globals.locale')] = t
    }
}

export default setServerI18n_t_fn