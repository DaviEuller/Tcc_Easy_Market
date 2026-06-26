"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/sidebarapp";
import { Button } from "@/components/ui/button";

import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";


export function Config() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  function trocarTema() {
    setTheme(theme === "dark" ? "light" : "dark");
  }


  if (!mounted) {
    return null;
  }


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium text-muted-foreground">
            Configurações
          </span>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4">

          <Card>
            <CardHeader>
              <CardTitle>
                Configurações
              </CardTitle>
              <CardDescription>
                Bem-vindo às configurações
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Preferências
              </CardTitle>
              <CardDescription className="flex justify-center gap-4">
                <Button
                  variant="destructive"
                >
                  Excluir Conta
                </Button>
                <Button
                  onClick={trocarTema}
                >
                  {theme === "dark"
                    ? "Tema Claro ☀️"
                    : "Tema Escuro 🌙"
                  }
                </Button>
              </CardDescription>
            </CardHeader>
          </Card>

        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}