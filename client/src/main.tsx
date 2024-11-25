import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

import { Start } from "./pages/Start";
import { Game } from "./pages/Game";
import { Settings } from "./pages/Settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Start} />
      <Route path="/game" component={Game} />
      <Route path="/settings" component={Settings} />
      <Route>404 Page Not Found</Route>
    </Switch>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
);
