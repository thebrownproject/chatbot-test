export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Original uses SidebarProvider, but for simplicity, just render children
  // This maintains the same structure without the complex sidebar
  return <>{children}</>;
}