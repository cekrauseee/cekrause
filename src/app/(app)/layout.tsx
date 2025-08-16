import { LanguageProvider } from '@/providers/language'
import { languageSchema } from '@/utils/schemas'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { cookies, headers } from 'next/headers'
import './index.css'

export const metadata: Metadata = {
  title: 'cekrause',
  description: 'A simple web signature.'
}

const sans = Manrope({
  variable: '--font-manrope',
  subsets: ['latin']
})

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [store, list] = await Promise.all([cookies(), headers()])

  const stored = store.get('language')?.value ?? list.get('accept-language')?.split(',')[0].split('-')[0]
  const parse = languageSchema.safeParse(stored)

  const language = parse.success ? parse.data : 'en'

  return (
    <html lang={language}>
      <body className={sans.variable}>
        <LanguageProvider language={language}>{children}</LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
