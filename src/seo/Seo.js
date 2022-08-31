const twitterTagsData = [
    {
        content: 'summary_large_image',
        key: 'name',
        name: 'twitter:card',
    },
    {
        content: 'seo.title',
        key: 'name',
        name: 'twitter:title',
    },
    {
        content: 'seo.description',
        key: 'name',
        name: 'twitter:description',
    },
    {
        content: 'seo.image',
        key: 'name',
        name: 'twitter:image',
    },
    {
        content: 'seo.alt',
        key: 'name',
        name: 'twitter:alt',
    },
]

const openGraphTagsData = [
    {
        content: 'article',
        key: 'property',
        property: 'og:type',
    },
    {
        content: 'seo.title',
        key: 'property',
        property: 'og:title',
    },
    {
        content: 'seo.description',
        key: 'property',
        property: 'og:description',
    },
    {
        content: 'seo.site.name',
        key: 'property',
        property: 'og:site_name',
    },
    {
        content: 'seo.site.canonical',
        key: 'property',
        property: 'og:url',
    },
    {
        content: 'seo.site.published-time',
        key: 'property',
        property: 'article:published_time',
    },
    {
        content: 'seo.site.author',
        key: 'property',
        property: 'article:author',
    },
]

const googlePlusTagsData = [
    {
        content: 'seo.title',
        itemProp: 'name',
        key: 'itemProp',
    },
    {
        content: 'seo.description',
        itemProp: 'description',
        key: 'itemProp',
    },
    {
        content: 'seo.image',
        itemProp: 'image',
        key: 'itemProp',
    },
]

const Seo = ({ t }) => {
    return (
        <>
            <meta name="description" content={t('seo.description')} />
            {[  ...googlePlusTagsData,
                ...openGraphTagsData,
                ...twitterTagsData].map((metaTagInfo, index) => {

                const tagInfo = {
                    [metaTagInfo.key]: metaTagInfo[metaTagInfo.key],
                    content: t(metaTagInfo.content),
                }
                return (
                    <meta key={index} { ...tagInfo } />
                )
            })}
        </>
    )
}

export default Seo