import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ChatState, User } from '../types/chat';

// TODO: Initialize with more sensible defaults or fetch initial state
const initialState: ChatState = {
  messages: [],
  bubbles: [],
  hotState: { isActive: false, currentText: '' },
  horizonState: { positionY: 0, visibleBubbles: [] },
  currentUser: null,
  activeDualView: undefined,
  highlightedTopics: [],
};

const ChatContext = createContext<ChatState>(initialState);
const ChatDispatchContext = createContext<React.Dispatch<any> | null>(null); // TODO: Define specific action types

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useState(initialState); // Consider useReducer for complex state logic

  // TODO: Define state update logic (reducer or state setters)

  return (
    <ChatContext.Provider value={state}>
      <ChatDispatchContext.Provider value={dispatch}>
        {children}
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
};

export const useChatState = () => useContext(ChatContext);
export const useChatDispatch = () => useContext(ChatDispatchContext); 