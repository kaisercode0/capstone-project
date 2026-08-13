'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('');
}

const SCROLL_THRESHOLD = 80;

export default function ChatInterface() {
  const messageListRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const [input, setInput] = useState('');

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleScroll = () => {
    const el = messageListRef.current;
    if (!el) return;

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    shouldAutoScrollRef.current = distanceFromBottom <= SCROLL_THRESHOLD;
  };

  useEffect(() => {
    const el = messageListRef.current;
    if (!el || !shouldAutoScrollRef.current) return;

    el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    shouldAutoScrollRef.current = true;
    sendMessage({ text: trimmed });
    setInput('');
  };

  const lastMessage = messages.at(-1);
  const hasAssistantText =
    lastMessage?.role === 'assistant' && getMessageText(lastMessage).length > 0;
  const showThinking = isLoading && !hasAssistantText;

  return (
    <div className="chat-shell">
      <div
        ref={messageListRef}
        onScroll={handleScroll}
        className="chat-messages"
      >
        {messages.map((message) => {
          const text = getMessageText(message);
          const isUser = message.role === 'user';

          return (
            <div
              key={message.id}
              className={`chat-message-row ${isUser ? 'chat-message-row--user' : 'chat-message-row--assistant'}`}
            >
              <div
                className={`chat-bubble ${isUser ? 'chat-bubble--user' : 'chat-bubble--assistant'}`}
              >
                {text}
              </div>
            </div>
          );
        })}

        {showThinking && (
          <div className="chat-message-row chat-message-row--assistant">
            <div className="chat-bubble chat-bubble--assistant chat-bubble--thinking">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask something..."
          disabled={isLoading}
          className="chat-input"
          aria-label="Message"
        />
        {isLoading ? (
          <button
            type="button"
            onClick={() => stop()}
            className="chat-action-button chat-action-button--stop"
            aria-label="Stop generation"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="chat-action-button chat-action-button--send"
            aria-label="Send message"
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}
