import { ThemeProvider } from '@/components/theme/theme-provider';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Outlet />
      <TanStackRouterDevtools />
    </ThemeProvider>
  ),
});
