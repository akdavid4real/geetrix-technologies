import { promises as fs } from 'fs'
import path from 'path'
import { head, put } from '@vercel/blob'
import { z } from 'zod'

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
})

const metricSchema = z.object({
  value: z.string(),
  label: z.string(),
})

const heroSchema = z.object({
  title: z.string(),
  highlightedText: z.string(),
  description: z.string(),
  primaryCtaLabel: z.string(),
  secondaryCtaLabel: z.string(),
  metrics: z.array(metricSchema),
})

const sliderItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  image: z.string(),
  icon: z.enum(['Code', 'Megaphone', 'Smartphone']),
  color: z.enum(['primary', 'accent']),
})

const statItemSchema = z.object({
  value: z.string(),
  label: z.string(),
  description: z.string(),
  icon: z.enum(['Target', 'Users', 'Zap']),
})

const processStepSchema = z.object({
  number: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.enum(['Target', 'Pencil', 'Cog', 'Search', 'Rocket', 'Chart']),
})

const pricingPlanSchema = z.object({
  label: z.string(),
  title: z.string(),
  price: z.string(),
  note: z.string(),
  popular: z.boolean().optional(),
  features: z.array(z.string()),
})

const pricingStandardSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.enum(['MonitorSmartphone', 'Search', 'ShieldCheck', 'Zap']),
})

const pricingRowSchema = z.object({
  group: z.string(),
  type: z.string(),
  description: z.string(),
  price: z.string(),
})

const projectSchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  client: z.string(),
  url: z.string(),
  image: z.string(),
})

const testimonialSchema = z.object({
  name: z.string(),
  company: z.string(),
  role: z.string(),
  content: z.string(),
  rating: z.number().int().min(1).max(5),
})

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
})

const socialLinkSchema = z.object({
  platform: z.enum(['LinkedIn', 'Twitter', 'Facebook']),
  href: z.string(),
})

const homepageContentSchema = z.object({
  metadata: z.object({
    title: z.string(),
    description: z.string(),
  }),
  header: z.object({
    brandName: z.string(),
    ctaLabel: z.string(),
    navLinks: z.array(linkSchema),
  }),
  hero: heroSchema,
  companySlider: z.object({
    items: z.array(sliderItemSchema),
    ctaLabel: z.string(),
  }),
  stats: z.object({
    items: z.array(statItemSchema),
  }),
  process: z.object({
    title: z.string(),
    description: z.string(),
    steps: z.array(processStepSchema),
    noteTitle: z.string(),
    noteDescription: z.string(),
  }),
  pricing: z.object({
    eyebrow: z.string(),
    title: z.string(),
    description: z.string(),
    plans: z.array(pricingPlanSchema),
    standardsTitle: z.string(),
    standardsDescription: z.string(),
    standards: z.array(pricingStandardSchema),
    tableTitle: z.string(),
    priceRows: z.array(pricingRowSchema),
    footnote: z.string(),
  }),
  portfolio: z.object({
    title: z.string(),
    description: z.string(),
    projects: z.array(projectSchema),
    ctaLabel: z.string(),
  }),
  testimonials: z.object({
    title: z.string(),
    description: z.string(),
    items: z.array(testimonialSchema),
  }),
  faq: z.object({
    title: z.string(),
    description: z.string(),
    items: z.array(faqItemSchema),
    contactCardTitle: z.string(),
    contactCardDescription: z.string(),
    contactCardLabel: z.string(),
  }),
  cta: z.object({
    title: z.string(),
    description: z.string(),
    primaryLabel: z.string(),
    primaryHref: z.string(),
    secondaryLabel: z.string(),
    secondaryHref: z.string(),
  }),
  footer: z.object({
    brandDescription: z.string(),
    serviceLinks: z.array(linkSchema),
    companyLinks: z.array(linkSchema),
    email: z.string(),
    phones: z.array(z.string()),
    addressLines: z.array(z.string()),
    socialLinks: z.array(socialLinkSchema),
  }),
  whatsapp: z.object({
    phoneNumber: z.string(),
    message: z.string(),
    tooltip: z.string(),
  }),
})

export type HomepageContent = z.infer<typeof homepageContentSchema>

const blobPath = 'homepage.json'
const contentPath = path.join(process.cwd(), 'content', 'homepage.json')

function hasBlobConfig() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

async function readHomepageContentFromBlob() {
  const blob = await head(blobPath)
  const response = await fetch(blob.url, { cache: 'no-store' })

  if (!response.ok) {
    throw new Error(`Homepage Blob download failed with status ${response.status}.`)
  }

  const parsed = await response.json()
  return homepageContentSchema.parse(parsed)
}

export async function readHomepageContent(): Promise<HomepageContent> {
  if (hasBlobConfig()) {
    try {
      return await readHomepageContentFromBlob()
    } catch (error) {
      if (
        error instanceof Error &&
        (error.message.includes('not found') || error.message.includes('does not exist'))
      ) {
        return readHomepageContentFromFile()
      }

      throw error
    }
  }

  return readHomepageContentFromFile()
}

async function readHomepageContentFromFile() {
  const file = await fs.readFile(contentPath, 'utf8')
  const parsed = JSON.parse(file)
  return homepageContentSchema.parse(parsed)
}

export async function writeHomepageContent(content: HomepageContent) {
  const parsed = homepageContentSchema.parse(content)
  const serialized = JSON.stringify(parsed)

  if (hasBlobConfig()) {
    await put(blobPath, serialized, {
      access: 'public',
      allowOverwrite: true,
      contentType: 'application/json',
      cacheControlMaxAge: 60,
    })
    return
  }

  try {
    await fs.writeFile(contentPath, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8')
  } catch (error) {
    if (
      error instanceof Error &&
      'code' in error &&
      (error as NodeJS.ErrnoException).code === 'EROFS'
    ) {
      throw new Error(
        'Homepage edits need writable storage in production. Configure Vercel Blob env var BLOB_READ_WRITE_TOKEN.'
      )
    }

    throw error
  }
}

export function validateHomepageContent(content: unknown) {
  return homepageContentSchema.parse(content)
}
