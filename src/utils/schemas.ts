import z from 'zod'

export const languageSchema = z.enum(['en', 'de', 'fr', 'ja'])
