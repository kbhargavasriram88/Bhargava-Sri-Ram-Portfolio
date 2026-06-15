import { getMessages } from "@/actions/messages";
import { MessageTable } from "@/components/admin/MessageTable";

export default async function AdminMessages() {
  const messages = await getMessages();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground mt-2">View and manage contact form submissions.</p>
        </div>
      </div>

      <MessageTable messages={messages} />
    </div>
  );
}
