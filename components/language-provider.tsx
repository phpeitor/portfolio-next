"use client"

import * as React from "react"

import { translate, type Language } from "@/lib/i18n"

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: (value: string) => string
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null)

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  const [language, setLanguageState] = React.useState<Language>("en")

  React.useEffect(() => {
    const stored = window.localStorage.getItem("language")
    // The persisted preference is external browser state and is read once
    // after hydration to keep the server and first client render identical.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "en" || stored === "es") setLanguageState(stored)
  }, [])

  const setLanguage = React.useCallback((next: Language) => {
    setLanguageState(next)
    window.localStorage.setItem("language", next)
    document.documentElement.lang = next
  }, [])

  const value = React.useMemo(
    () => ({ language, setLanguage, t: (text: string) => translate(text, language) }),
    [language, setLanguage]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const context = React.useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within LanguageProvider")
  return context
}
