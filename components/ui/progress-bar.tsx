"use client"

import { motion } from "framer-motion"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  stepTitles?: string[]
}

export function ProgressBar({ currentStep, totalSteps, stepTitles }: ProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="w-full mb-8">
      {/* Step indicators */}
      <div className="flex justify-between items-center mb-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          
          return (
            <div key={stepNumber} className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ 
                  scale: isCurrent ? 1.1 : 1,
                  opacity: isCompleted || isCurrent ? 1 : 0.5
                }}
                transition={{ duration: 0.3 }}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  ${isCompleted 
                    ? 'bg-gradient-to-r from-[#b8860b] to-[#daa520] text-white' 
                    : isCurrent 
                      ? 'bg-gradient-to-r from-[#b8860b] to-[#daa520] text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </motion.div>
              {stepTitles && stepTitles[index] && (
                <span className={`text-xs mt-2 text-center max-w-16 ${
                  isCurrent ? 'text-[#b8860b] font-semibold' : 'text-gray-500'
                }`}>
                  {stepTitles[index]}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-gradient-to-r from-[#b8860b] to-[#daa520] h-2 rounded-full relative overflow-hidden"
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </motion.div>
        </div>
        
        {/* Progress percentage */}
        <div className="flex justify-end mt-2">
          <span className="text-sm text-gray-600 font-medium">
            {Math.round(progressPercentage)}% completo
          </span>
        </div>
      </div>
    </div>
  )
}