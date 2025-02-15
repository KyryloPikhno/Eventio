"use client"

import { currentYear } from "@/app/utils/date"
import {
  AppShell,
  AppShellFooter,
  AppShellMain,
  Burger,
  ColorSchemeScript,
  Group,
  MantineProvider,
  Text,
} from "@mantine/core"
import "@mantine/core/styles.css"
import { useDisclosure } from "@mantine/hooks"
import { Inter } from "next/font/google"
import { BlitzProvider } from "./blitz-client"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure()

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={inter.className}>
        <MantineProvider defaultColorScheme="dark">
          <AppShell
            header={{ height: 60 }}
            footer={{ height: 60 }}
            navbar={{
              width: 300,
              breakpoint: "sm",
              collapsed: { mobile: !opened, desktop: !opened },
            }}
            padding="md"
          >
            <BlitzProvider>
              <AppShell.Header>
                <Group justify="start" pl="8" h="100%">
                  <Burger opened={opened} onClick={toggle} size="sm" />
                  <Text>Eventio</Text>
                </Group>
              </AppShell.Header>

              <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

              <AppShellMain>{children}</AppShellMain>

              <AppShellFooter>
                <Group justify="center" h="100%">
                  <Text size="sm">© {currentYear} Eventio. All rights reserved.</Text>
                </Group>
              </AppShellFooter>
            </BlitzProvider>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  )
}
