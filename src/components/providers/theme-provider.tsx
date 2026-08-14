"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const NextThemesProviderClient = dynamic(
  () => Promise.resolve(NextThemesProvider),
  { ssr: false }
);

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProviderClient {...props}>
      {children}
    </NextThemesProviderClient>
  );
}
