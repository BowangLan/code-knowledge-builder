import { cookies } from "next/headers";

import { auth } from "../(auth)/auth";
import NoteList from "@/components/notes/note-list";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import { SidebarProvider } from "@/components/ui/sidebar";

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get("sidebar:state")?.value !== "true";

  return (
    // <>
    // <NoteList/>
    // <SidebarUserNav user={session?.user} />
    // </>

    <>
      {children}
    </>
  );
}
