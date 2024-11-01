import { ClientComponent } from "./ClientComponent";
import { ServerSession } from "./ServerComponent";

export default function MainPage() {

  return (
    <div>
      <h3>Next JS application with frontegg</h3>
      <ServerSession />
      <ClientComponent />
    </div>
  );
}
