'use client'

import { useEffect, useState } from 'react'
import type { HomepageContent } from '@/lib/homepage-content'

type HomepageEditorProps = {
  initialContent: HomepageContent
}

type TabId =
  | 'overview'
  | 'hero'
  | 'services'
  | 'pricing'
  | 'portfolio'
  | 'social-proof'
  | 'contact'
  | 'advanced'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'hero', label: 'Hero' },
  { id: 'services', label: 'Services' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'social-proof', label: 'Testimonials & FAQ' },
  { id: 'contact', label: 'Contact' },
  { id: 'advanced', label: 'Advanced JSON' },
]

function splitLines(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function EditorSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-border/60 bg-card p-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-28 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />
      )}
    </label>
  )
}

function TabButton({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'border border-border bg-background text-foreground hover:bg-secondary'
      }`}
    >
      {label}
    </button>
  )
}

export function HomepageEditor({ initialContent }: HomepageEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [rawJson, setRawJson] = useState(() => JSON.stringify(initialContent, null, 2))
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  useEffect(() => {
    setRawJson(JSON.stringify(content, null, 2))
  }, [content])

  async function saveContent() {
    setSaving(true)
    setStatus('')

    const response = await fetch('/api/admin/content', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    })

    const data = (await response.json().catch(() => null)) as { error?: string } | null

    if (!response.ok) {
      setStatus(data?.error || 'Save failed')
      setSaving(false)
      return
    }

    setStatus('Saved successfully.')
    setSaving(false)
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.reload()
  }

  function applyRawJson() {
    try {
      const parsed = JSON.parse(rawJson) as HomepageContent
      setContent(parsed)
      setStatus('Raw JSON applied. Save changes to publish it.')
    } catch {
      setStatus('Raw JSON is not valid.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-card p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Homepage Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Edit the homepage from grouped tabs. Changes save into `content/homepage.json`.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground"
          >
            Log Out
          </button>
          <button
            type="button"
            onClick={saveContent}
            disabled={saving}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {status ? <p className="text-sm text-primary">{status}</p> : null}

      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            label={tab.label}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-6">
          <EditorSection title="Metadata">
            <Field
              label="Page title"
              value={content.metadata.title}
              onChange={(value) => setContent({ ...content, metadata: { ...content.metadata, title: value } })}
            />
            <Field
              label="Meta description"
              value={content.metadata.description}
              multiline
              onChange={(value) => setContent({ ...content, metadata: { ...content.metadata, description: value } })}
            />
          </EditorSection>

          <EditorSection title="Header">
            <Field
              label="Brand name"
              value={content.header.brandName}
              onChange={(value) => setContent({ ...content, header: { ...content.header, brandName: value } })}
            />
            <Field
              label="Header CTA label"
              value={content.header.ctaLabel}
              onChange={(value) => setContent({ ...content, header: { ...content.header, ctaLabel: value } })}
            />
          </EditorSection>

          <EditorSection title="Stats">
            {content.stats.items.map((item, index) => (
              <div key={index} className="grid gap-4 rounded-xl border border-border/50 p-4 md:grid-cols-3">
                <Field
                  label="Value"
                  value={item.value}
                  onChange={(value) => {
                    const items = [...content.stats.items]
                    items[index] = { ...items[index], value }
                    setContent({ ...content, stats: { ...content.stats, items } })
                  }}
                />
                <Field
                  label="Label"
                  value={item.label}
                  onChange={(value) => {
                    const items = [...content.stats.items]
                    items[index] = { ...items[index], label: value }
                    setContent({ ...content, stats: { ...content.stats, items } })
                  }}
                />
                <Field
                  label="Description"
                  value={item.description}
                  onChange={(value) => {
                    const items = [...content.stats.items]
                    items[index] = { ...items[index], description: value }
                    setContent({ ...content, stats: { ...content.stats, items } })
                  }}
                />
              </div>
            ))}
          </EditorSection>
        </div>
      ) : null}

      {activeTab === 'hero' ? (
        <div className="space-y-6">
          <EditorSection title="Hero">
            <Field
              label="Hero title"
              value={content.hero.title}
              onChange={(value) => setContent({ ...content, hero: { ...content.hero, title: value } })}
            />
            <Field
              label="Highlighted text"
              value={content.hero.highlightedText}
              onChange={(value) => setContent({ ...content, hero: { ...content.hero, highlightedText: value } })}
            />
            <Field
              label="Hero description"
              value={content.hero.description}
              multiline
              onChange={(value) => setContent({ ...content, hero: { ...content.hero, description: value } })}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Primary CTA"
                value={content.hero.primaryCtaLabel}
                onChange={(value) => setContent({ ...content, hero: { ...content.hero, primaryCtaLabel: value } })}
              />
              <Field
                label="Secondary CTA"
                value={content.hero.secondaryCtaLabel}
                onChange={(value) => setContent({ ...content, hero: { ...content.hero, secondaryCtaLabel: value } })}
              />
            </div>
          </EditorSection>
        </div>
      ) : null}

      {activeTab === 'services' ? (
        <div className="space-y-6">
          <EditorSection title="Services Slider" description="Each feature should be one line.">
            {content.companySlider.items.map((item, index) => (
              <div key={index} className="space-y-4 rounded-xl border border-border/50 p-4">
                <Field
                  label={`Slide ${index + 1} title`}
                  value={item.title}
                  onChange={(value) => {
                    const items = [...content.companySlider.items]
                    items[index] = { ...items[index], title: value }
                    setContent({ ...content, companySlider: { ...content.companySlider, items } })
                  }}
                />
                <Field
                  label="Description"
                  value={item.description}
                  multiline
                  onChange={(value) => {
                    const items = [...content.companySlider.items]
                    items[index] = { ...items[index], description: value }
                    setContent({ ...content, companySlider: { ...content.companySlider, items } })
                  }}
                />
                <Field
                  label="Image URL"
                  value={item.image}
                  onChange={(value) => {
                    const items = [...content.companySlider.items]
                    items[index] = { ...items[index], image: value }
                    setContent({ ...content, companySlider: { ...content.companySlider, items } })
                  }}
                />
                <Field
                  label="Features"
                  value={item.features.join('\n')}
                  multiline
                  onChange={(value) => {
                    const items = [...content.companySlider.items]
                    items[index] = { ...items[index], features: splitLines(value) }
                    setContent({ ...content, companySlider: { ...content.companySlider, items } })
                  }}
                />
              </div>
            ))}
          </EditorSection>

          <EditorSection title="Process">
            <Field
              label="Section title"
              value={content.process.title}
              onChange={(value) => setContent({ ...content, process: { ...content.process, title: value } })}
            />
            <Field
              label="Section description"
              value={content.process.description}
              multiline
              onChange={(value) => setContent({ ...content, process: { ...content.process, description: value } })}
            />
            {content.process.steps.map((step, index) => (
              <div key={index} className="space-y-4 rounded-xl border border-border/50 p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Step number"
                    value={step.number}
                    onChange={(value) => {
                      const steps = [...content.process.steps]
                      steps[index] = { ...steps[index], number: value }
                      setContent({ ...content, process: { ...content.process, steps } })
                    }}
                  />
                  <Field
                    label="Step title"
                    value={step.title}
                    onChange={(value) => {
                      const steps = [...content.process.steps]
                      steps[index] = { ...steps[index], title: value }
                      setContent({ ...content, process: { ...content.process, steps } })
                    }}
                  />
                </div>
                <Field
                  label="Step description"
                  value={step.description}
                  multiline
                  onChange={(value) => {
                    const steps = [...content.process.steps]
                    steps[index] = { ...steps[index], description: value }
                    setContent({ ...content, process: { ...content.process, steps } })
                  }}
                />
              </div>
            ))}
            <Field
              label="Bottom note title"
              value={content.process.noteTitle}
              onChange={(value) => setContent({ ...content, process: { ...content.process, noteTitle: value } })}
            />
            <Field
              label="Bottom note description"
              value={content.process.noteDescription}
              multiline
              onChange={(value) => setContent({ ...content, process: { ...content.process, noteDescription: value } })}
            />
          </EditorSection>
        </div>
      ) : null}

      {activeTab === 'pricing' ? (
        <div className="space-y-6">
          <EditorSection title="Pricing" description="Plan features and footnotes live here.">
            <Field
              label="Section label"
              value={content.pricing.eyebrow}
              onChange={(value) => setContent({ ...content, pricing: { ...content.pricing, eyebrow: value } })}
            />
            <Field
              label="Section title"
              value={content.pricing.title}
              onChange={(value) => setContent({ ...content, pricing: { ...content.pricing, title: value } })}
            />
            <Field
              label="Section description"
              value={content.pricing.description}
              multiline
              onChange={(value) => setContent({ ...content, pricing: { ...content.pricing, description: value } })}
            />
            {content.pricing.plans.map((plan, index) => (
              <div key={index} className="space-y-4 rounded-xl border border-border/50 p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Plan label"
                    value={plan.label}
                    onChange={(value) => {
                      const plans = [...content.pricing.plans]
                      plans[index] = { ...plans[index], label: value }
                      setContent({ ...content, pricing: { ...content.pricing, plans } })
                    }}
                  />
                  <Field
                    label="Plan title"
                    value={plan.title}
                    onChange={(value) => {
                      const plans = [...content.pricing.plans]
                      plans[index] = { ...plans[index], title: value }
                      setContent({ ...content, pricing: { ...content.pricing, plans } })
                    }}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Price"
                    value={plan.price}
                    onChange={(value) => {
                      const plans = [...content.pricing.plans]
                      plans[index] = { ...plans[index], price: value }
                      setContent({ ...content, pricing: { ...content.pricing, plans } })
                    }}
                  />
                  <Field
                    label="Note"
                    value={plan.note}
                    onChange={(value) => {
                      const plans = [...content.pricing.plans]
                      plans[index] = { ...plans[index], note: value }
                      setContent({ ...content, pricing: { ...content.pricing, plans } })
                    }}
                  />
                </div>
                <Field
                  label="Features"
                  value={plan.features.join('\n')}
                  multiline
                  onChange={(value) => {
                    const plans = [...content.pricing.plans]
                    plans[index] = { ...plans[index], features: splitLines(value) }
                    setContent({ ...content, pricing: { ...content.pricing, plans } })
                  }}
                />
              </div>
            ))}
            <Field
              label="Pricing footnote"
              value={content.pricing.footnote}
              multiline
              onChange={(value) => setContent({ ...content, pricing: { ...content.pricing, footnote: value } })}
            />
          </EditorSection>
        </div>
      ) : null}

      {activeTab === 'portfolio' ? (
        <div className="space-y-6">
          <EditorSection title="Portfolio">
            <Field
              label="Section title"
              value={content.portfolio.title}
              onChange={(value) => setContent({ ...content, portfolio: { ...content.portfolio, title: value } })}
            />
            <Field
              label="Section description"
              value={content.portfolio.description}
              multiline
              onChange={(value) => setContent({ ...content, portfolio: { ...content.portfolio, description: value } })}
            />
            {content.portfolio.projects.map((project, index) => (
              <div key={index} className="space-y-4 rounded-xl border border-border/50 p-4">
                <Field
                  label="Project title"
                  value={project.title}
                  onChange={(value) => {
                    const projects = [...content.portfolio.projects]
                    projects[index] = { ...projects[index], title: value }
                    setContent({ ...content, portfolio: { ...content.portfolio, projects } })
                  }}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Client"
                    value={project.client}
                    onChange={(value) => {
                      const projects = [...content.portfolio.projects]
                      projects[index] = { ...projects[index], client: value }
                      setContent({ ...content, portfolio: { ...content.portfolio, projects } })
                    }}
                  />
                  <Field
                    label="Category"
                    value={project.category}
                    onChange={(value) => {
                      const projects = [...content.portfolio.projects]
                      projects[index] = { ...projects[index], category: value }
                      setContent({ ...content, portfolio: { ...content.portfolio, projects } })
                    }}
                  />
                </div>
                <Field
                  label="Description"
                  value={project.description}
                  multiline
                  onChange={(value) => {
                    const projects = [...content.portfolio.projects]
                    projects[index] = { ...projects[index], description: value }
                    setContent({ ...content, portfolio: { ...content.portfolio, projects } })
                  }}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Project URL"
                    value={project.url}
                    onChange={(value) => {
                      const projects = [...content.portfolio.projects]
                      projects[index] = { ...projects[index], url: value }
                      setContent({ ...content, portfolio: { ...content.portfolio, projects } })
                    }}
                  />
                  <Field
                    label="Image URL"
                    value={project.image}
                    onChange={(value) => {
                      const projects = [...content.portfolio.projects]
                      projects[index] = { ...projects[index], image: value }
                      setContent({ ...content, portfolio: { ...content.portfolio, projects } })
                    }}
                  />
                </div>
              </div>
            ))}
          </EditorSection>
        </div>
      ) : null}

      {activeTab === 'social-proof' ? (
        <div className="space-y-6">
          <EditorSection title="Testimonials">
            <Field
              label="Section title"
              value={content.testimonials.title}
              onChange={(value) => setContent({ ...content, testimonials: { ...content.testimonials, title: value } })}
            />
            <Field
              label="Section description"
              value={content.testimonials.description}
              multiline
              onChange={(value) => setContent({ ...content, testimonials: { ...content.testimonials, description: value } })}
            />
            {content.testimonials.items.map((item, index) => (
              <div key={index} className="space-y-4 rounded-xl border border-border/50 p-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Field
                    label="Name"
                    value={item.name}
                    onChange={(value) => {
                      const items = [...content.testimonials.items]
                      items[index] = { ...items[index], name: value }
                      setContent({ ...content, testimonials: { ...content.testimonials, items } })
                    }}
                  />
                  <Field
                    label="Role"
                    value={item.role}
                    onChange={(value) => {
                      const items = [...content.testimonials.items]
                      items[index] = { ...items[index], role: value }
                      setContent({ ...content, testimonials: { ...content.testimonials, items } })
                    }}
                  />
                  <Field
                    label="Company"
                    value={item.company}
                    onChange={(value) => {
                      const items = [...content.testimonials.items]
                      items[index] = { ...items[index], company: value }
                      setContent({ ...content, testimonials: { ...content.testimonials, items } })
                    }}
                  />
                </div>
                <Field
                  label="Testimonial"
                  value={item.content}
                  multiline
                  onChange={(value) => {
                    const items = [...content.testimonials.items]
                    items[index] = { ...items[index], content: value }
                    setContent({ ...content, testimonials: { ...content.testimonials, items } })
                  }}
                />
              </div>
            ))}
          </EditorSection>

          <EditorSection title="FAQ">
            <Field
              label="Section title"
              value={content.faq.title}
              onChange={(value) => setContent({ ...content, faq: { ...content.faq, title: value } })}
            />
            <Field
              label="Section description"
              value={content.faq.description}
              multiline
              onChange={(value) => setContent({ ...content, faq: { ...content.faq, description: value } })}
            />
            {content.faq.items.map((item, index) => (
              <div key={index} className="space-y-4 rounded-xl border border-border/50 p-4">
                <Field
                  label="Question"
                  value={item.question}
                  onChange={(value) => {
                    const items = [...content.faq.items]
                    items[index] = { ...items[index], question: value }
                    setContent({ ...content, faq: { ...content.faq, items } })
                  }}
                />
                <Field
                  label="Answer"
                  value={item.answer}
                  multiline
                  onChange={(value) => {
                    const items = [...content.faq.items]
                    items[index] = { ...items[index], answer: value }
                    setContent({ ...content, faq: { ...content.faq, items } })
                  }}
                />
              </div>
            ))}
          </EditorSection>
        </div>
      ) : null}

      {activeTab === 'contact' ? (
        <div className="space-y-6">
          <EditorSection title="Call To Action">
            <Field
              label="CTA title"
              value={content.cta.title}
              onChange={(value) => setContent({ ...content, cta: { ...content.cta, title: value } })}
            />
            <Field
              label="CTA description"
              value={content.cta.description}
              multiline
              onChange={(value) => setContent({ ...content, cta: { ...content.cta, description: value } })}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Primary label"
                value={content.cta.primaryLabel}
                onChange={(value) => setContent({ ...content, cta: { ...content.cta, primaryLabel: value } })}
              />
              <Field
                label="Primary href"
                value={content.cta.primaryHref}
                onChange={(value) => setContent({ ...content, cta: { ...content.cta, primaryHref: value } })}
              />
              <Field
                label="Secondary label"
                value={content.cta.secondaryLabel}
                onChange={(value) => setContent({ ...content, cta: { ...content.cta, secondaryLabel: value } })}
              />
              <Field
                label="Secondary href"
                value={content.cta.secondaryHref}
                onChange={(value) => setContent({ ...content, cta: { ...content.cta, secondaryHref: value } })}
              />
            </div>
          </EditorSection>

          <EditorSection title="Footer and WhatsApp">
            <Field
              label="Footer email"
              value={content.footer.email}
              onChange={(value) => setContent({ ...content, footer: { ...content.footer, email: value } })}
            />
            <Field
              label="Footer phone numbers"
              value={content.footer.phones.join('\n')}
              multiline
              onChange={(value) => setContent({ ...content, footer: { ...content.footer, phones: splitLines(value) } })}
            />
            <Field
              label="Footer address lines"
              value={content.footer.addressLines.join('\n')}
              multiline
              onChange={(value) => setContent({ ...content, footer: { ...content.footer, addressLines: splitLines(value) } })}
            />
            <Field
              label="WhatsApp number"
              value={content.whatsapp.phoneNumber}
              onChange={(value) => setContent({ ...content, whatsapp: { ...content.whatsapp, phoneNumber: value } })}
            />
            <Field
              label="WhatsApp message"
              value={content.whatsapp.message}
              multiline
              onChange={(value) => setContent({ ...content, whatsapp: { ...content.whatsapp, message: value } })}
            />
            <Field
              label="WhatsApp tooltip"
              value={content.whatsapp.tooltip}
              onChange={(value) => setContent({ ...content, whatsapp: { ...content.whatsapp, tooltip: value } })}
            />
          </EditorSection>
        </div>
      ) : null}

      {activeTab === 'advanced' ? (
        <EditorSection
          title="Advanced JSON"
          description="Use this for navigation links, price table rows, standards, social links, or any other field not exposed in the form tabs."
        >
          <textarea
            value={rawJson}
            onChange={(event) => setRawJson(event.target.value)}
            className="min-h-[520px] w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm outline-none focus:border-primary"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={applyRawJson}
              className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground"
            >
              Apply JSON To Form
            </button>
          </div>
        </EditorSection>
      ) : null}
    </div>
  )
}
