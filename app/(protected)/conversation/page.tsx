import { Bot } from "lucide-react";

import ResponsePageHeading from "@/components/response-page/response-page-heading";
import Chat from "@/components/conversation/chat";
import { authOptions } from "@/auth";
import { getServerSession, User } from "next-auth";

export default async function ConversationPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="px-8">
      <ResponsePageHeading
        ai={{
          title: "AI Assistant",
          description: "Our most advanced conversation model.",
          icon: Bot as React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
          iconColor: "text-violet-500",
          bgColor: "bg-violet-500/10",
        }}
      />
      {session && <Chat session={session} />}
    </div>
  );
}
