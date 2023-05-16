import { ThemeProvider } from "styled-components"
import { ProviderProps } from "../../../../../../../WebstormProjects/event-vet-fe-4hr/src/components/components/atoms/Text/Typography.test"
import { defaultTheme } from "../../../../../../../WebstormProjects/event-vet-fe-4hr/src/app/theme"

export const TestProvider = ({ children, withTheme }: ProviderProps) => {
  let providers = <>{children}</>
  if (withTheme) {
    providers = <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
  }
  return providers
}
