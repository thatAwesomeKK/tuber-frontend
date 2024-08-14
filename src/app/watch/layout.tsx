export default function WatchPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-[95vw] mx-auto my-10">
      {children}
    </main>
  );
}
