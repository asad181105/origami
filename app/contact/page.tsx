import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact Us | The Origami AI',
  description: 'Book a demo or get in touch with The Origami AI to learn how we can automate your business workflows.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background-light pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Let's Build Your AI Agent
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-6">
            Tell us about your business, and we'll show you how our AI agents can fold complexity into simplicity.
          </p>
          <p className="text-base text-neutral-500 max-w-2xl mx-auto">
            Or chat with us directly on WhatsApp for instant support.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}

