"use client"

import { Providers as ReduxProviders } from "../redux/provider"
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ReduxProviders>{children}</ReduxProviders>
    </>
  )
}

export default Providers
