'use client'

import { useLanguage } from '@/providers/language'
import { languageSchema } from '@/utils/schemas'
import Link from 'next/link'
import { Fragment } from 'react'
import { twMerge } from 'tailwind-merge'

const USERNAME = 'cekrauseee'

const NAV_LINKS: { href: string; label: string }[] = [
  {
    href: `https://github.com/${USERNAME}`,
    label: 'GITHUB'
  },
  {
    href: `https://linkedin.com/in/${USERNAME}`,
    label: 'LINKEDIN'
  },
  {
    href: `https://x.com/${USERNAME}`,
    label: 'X'
  }
]

export default function Page() {
  const { language, setLanguage, getTranslation } = useLanguage()
  const text = twMerge(language === 'ja' && 'break-keep')

  return (
    <div className='mx-auto flex h-svh w-full max-w-3xl flex-col space-y-8 px-4 pt-18 pb-12 sm:pt-24 sm:pb-16'>
      <header>
        <nav className='space-x-2 text-sm sm:text-base'>
          {NAV_LINKS.map(({ href, label }, i) => (
            <Fragment key={label}>
              <Link
                href={href}
                target='_blank'
                className='button'
              >
                {label}
              </Link>
              {i < NAV_LINKS.length - 1 && <span>/</span>}
            </Fragment>
          ))}
        </nav>
      </header>
      <main className='flex-1 text-3xl leading-12 sm:text-6xl sm:leading-24'>
        <h1>HENRIQUE KRAUSE</h1>
        <h2 className={text}>{getTranslation('software-engineer')}</h2>
        <p className={text}>{getTranslation('based-in-lisbon')}</p>
        <p className={text}>
          <span>{getTranslation('coding-for')}</span>
          <span>&nbsp;</span>
          <Link
            href='https://clinia.io'
            target='_blank'
            className='button'
          >
            CLINIA
          </Link>
        </p>
      </main>
      <footer className='flex gap-x-2 text-sm sm:text-base'>
        {Object.values(languageSchema.enum).map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={twMerge('button', language !== lang && 'font-normal')}
            data-selected={language === lang}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </footer>
    </div>
  )
}
