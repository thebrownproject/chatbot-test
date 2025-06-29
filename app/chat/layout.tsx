export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      {/* Simple header */}
      <header className="border-b p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <h1 className="text-lg font-semibold">Focus Chat</h1>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">← Home</Link>
          </Button>
        </div>
      </header>

      {/* Chat content */}
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
