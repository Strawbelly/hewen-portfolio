"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { contactLinks } from "@/content/contact";

type Message = {
  id: string;
  from: "me" | "hewen";
  text: string;
  time: string;
};

const autoReply = "Message received! 🐰 Thanks for exploring my little corner of the internet. If you'd like a real reply, email is the way to go :)";

const formatTime = (date: Date) =>
  date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

export function ContactChat() {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [pendingReplies, setPendingReplies] = useState(0);
  const nextMessageId = useRef(0);
  const replyTimers = useRef<number[]>([]);
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const time = formatTime(new Date());
    setMessages([
      { id: "welcome", from: "hewen", text: "Let's make something weird on the internet! 🥳", time },
      { id: "contact-links", from: "hewen", text: "email me / find me on linkedin", time },
    ]);
    return () => replyTimers.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    const conversation = conversationRef.current;
    conversation?.scrollTo({ top: conversation.scrollHeight, behavior: "smooth" });
  }, [messages, pendingReplies]);

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { id: `me-${nextMessageId.current++}`, from: "me", text, time: formatTime(new Date()) },
    ]);
    setDraft("");
    setPendingReplies((count) => count + 1);

    const timer = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: `hewen-${nextMessageId.current++}`, from: "hewen", text: autoReply, time: formatTime(new Date()) },
      ]);
      setPendingReplies((count) => Math.max(0, count - 1));
      replyTimers.current = replyTimers.current.filter((pendingTimer) => pendingTimer !== timer);
    }, 900);
    replyTimers.current.push(timer);
  };

  return (
    <div className="contact-system-dialog">
      <header className="contact-messenger-profile">
        <Image src="/assets/rabbit-avatar.jpg" alt="" width={36} height={36} />
        <strong>Hewen</strong>
        <span><i aria-hidden="true" />Online</span>
      </header>

      <div
        ref={conversationRef}
        className="contact-messenger-chat"
        aria-label="Conversation with Hewen"
        aria-live="polite"
      >
        {messages.map((message) => (
          <div key={message.id} className={`contact-message is-${message.from}`}>
            {message.id === "contact-links" ? (
              <p className="contact-message-links">
                <a href={`mailto:${contactLinks.email}`}>📧 email me</a>
                <a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  🔗 find me on linkedin
                </a>
              </p>
            ) : <p>{message.text}</p>}
            <time>{message.time}</time>
          </div>
        ))}
        {pendingReplies > 0 ? <p className="contact-typing">Hewen is typing...</p> : null}
      </div>

      <form className="contact-messenger-composer" onSubmit={sendMessage}>
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          aria-label="Message Hewen"
          placeholder="Type a message..."
        />
        <button type="submit" disabled={!draft.trim()}>Send</button>
      </form>
    </div>
  );
}
