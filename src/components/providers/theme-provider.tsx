"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      {...props}
      enableSystem={false}
      scriptProps={{ id: "next-themes-script", suppressHydrationWarning: true }}
    >
      {children}
    </NextThemesProvider>
  );
}
