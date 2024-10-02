'use client'

import { store } from '@/src/redux/store'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { useRouter } from 'next/navigation'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter()

  return (
    <Provider store={store}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        <Toaster position='top-center' richColors expand={false} />
      </NextUIProvider>
    </Provider>
  )
}
