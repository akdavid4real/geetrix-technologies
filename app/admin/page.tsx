import { HomepageEditor } from '@/components/admin/homepage-editor'
import { LoginForm } from '@/components/admin/login-form'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { readHomepageContent } from '@/lib/homepage-content'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated()

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-background px-4 py-16">
        <div className="container mx-auto flex justify-center">
          <LoginForm />
        </div>
      </main>
    )
  }

  const content = await readHomepageContent()

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="container mx-auto max-w-6xl">
        <HomepageEditor initialContent={content} />
      </div>
    </main>
  )
}
