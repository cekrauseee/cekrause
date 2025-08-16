import z from 'zod'
import { languageSchema } from './schemas'

export type Language = z.infer<typeof languageSchema>
