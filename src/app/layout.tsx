"use client"

import { BlitzProvider } from "@/app/blitz-client"
import { currentYear } from "@/app/utils/date"
import {
  Anchor,
  AppShell,
  AppShellFooter,
  AppShellMain,
  Burger,
  ColorSchemeScript,
  Group,
  MantineProvider,
  Stack,
  Text,
} from "@mantine/core"
import "@mantine/core/styles.css"
import { useDisclosure } from "@mantine/hooks"
import { Inter } from "next/font/google"

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
            padding="md"
            header={{ height: 60 }}
            footer={{ height: 100 }}
            navbar={{
              width: 300,
              breakpoint: "sm",
              collapsed: { mobile: !opened, desktop: !opened },
            }}
          >
            <BlitzProvider>
              <AppShell.Header>
                <Group justify="start" pl="8" h="100%">
                  <Burger opened={opened} onClick={toggle} size="sm" />
                  <Text fw="bold">Eventio</Text>
                </Group>
              </AppShell.Header>

              <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

              <AppShellMain>{children}</AppShellMain>

              <AppShellFooter h="100px">
                <Group justify="center" h="100%">
                  <Stack py="2" align="center">
                    <Text fw="bold" size="sm">
                      © {currentYear} Eventio. All rights reserved.
                    </Text>
                    <Anchor size="sm" href="https://github.com/KyryloPikhno">
                      My GitHub
                    </Anchor>
                  </Stack>
                </Group>
              </AppShellFooter>
            </BlitzProvider>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  )
}
