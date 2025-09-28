"use client"

import { MultiStepForm } from "@/components/multi-step-form"

export default function FormularioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Formulário */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <MultiStepForm />
      </div>
    </div>
  )
}