import React from 'react'
import Link from 'next/link'
import styles from './ArtistHeader.module.scss'

export default function ArtistHeader() {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>

                <Link href="/">
                    Bio
                </Link>
                <Link href="/">
                    Singles
                </Link>
            </nav>
        </header>

    )
}
