import { RabbitAvatar } from "@/components/rabbit/RabbitAvatar";

type PhoneScreenProps = {
  text: string;
  status: "typing" | "connecting" | "connected";
};

export function PhoneScreen({ text, status }: PhoneScreenProps) {
  return (
    <div className="phone-screen">
      <div className="phone-screen-status">
        <span>HSHN</span>
        <span>{status === "typing" ? "abc" : "net"}</span>
      </div>
      <div className="phone-screen-content" aria-live={status === "typing" ? "polite" : "assertive"}>
        {status === "typing" ? (
          <>
            <RabbitAvatar size="sm" priority className="phone-screen-rabbit" />
            <span className="phone-screen-prompt">{text || "ENTER NAME_"}</span>
          </>
        ) : (
          <>
            <span className="phone-screen-message screen-flicker">
              {status === "connecting" ? "CONNECTING..." : "CONNECTED"}
            </span>
            <span className={`phone-screen-loader ${status === "connected" ? "is-complete" : ""}`} />
          </>
        )}
      </div>
    </div>
  );
}
