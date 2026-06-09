import { MessageCircle } from 'lucide-react'
import { readHomepageContent } from '@/lib/homepage-content'

export async function WhatsAppButton() {
  const content = await readHomepageContent()
  const whatsappUrl = `https://wa.me/${content.whatsapp.phoneNumber}?text=${encodeURIComponent(content.whatsapp.message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#128C7E] group focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-800 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
        {content.whatsapp.tooltip}
      </span>
    </a>
  )
}
