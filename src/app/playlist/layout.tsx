import PlaylistsResult from "@/components/Playlist/PlaylistsResult";
import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value as string;

  return (
    <section className="flex">
      <section className="flex-[1]">
        <PlaylistsResult accessToken={accessToken} />
      </section>
      <Separator className="h-96" orientation="vertical" />
      <section className="flex-[3] ml-10">{children}</section>
    </section>
  );
}
