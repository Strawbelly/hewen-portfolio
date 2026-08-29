export const KEYPAD_MAP = {
  "2": ["A", "B", "C"],
  "3": ["D", "E", "F"],
  "4": ["G", "H", "I"],
  "5": ["J", "K", "L"],
  "6": ["M", "N", "O"],
  "7": ["P", "Q", "R", "S"],
  "8": ["T", "U", "V"],
  "9": ["W", "X", "Y", "Z"]
} as const;

export type KeypadDigit = keyof typeof KEYPAD_MAP;

export type MultiTapState = {
  committed: string;
  pendingKey: KeypadDigit | null;
  pendingIndex: number;
};

export const COMMIT_DELAY = 850;

export function isKeypadDigit(value: string): value is KeypadDigit {
  return Object.prototype.hasOwnProperty.call(KEYPAD_MAP, value);
}

export function previewText(state: MultiTapState) {
  if (!state.pendingKey) {
    return state.committed;
  }

  return state.committed + KEYPAD_MAP[state.pendingKey][state.pendingIndex];
}

export function commitPending(state: MultiTapState): MultiTapState {
  return {
    committed: previewText(state),
    pendingKey: null,
    pendingIndex: 0
  };
}

export function pressDigit(state: MultiTapState, digit: KeypadDigit): MultiTapState {
  if (state.pendingKey === digit) {
    return {
      ...state,
      pendingIndex: (state.pendingIndex + 1) % KEYPAD_MAP[digit].length
    };
  }

  const committed = state.pendingKey ? previewText(state) : state.committed;

  return {
    committed,
    pendingKey: digit,
    pendingIndex: 0
  };
}

export function backspace(state: MultiTapState): MultiTapState {
  if (state.pendingKey) {
    return {
      ...state,
      pendingKey: null,
      pendingIndex: 0
    };
  }

  return {
    ...state,
    committed: state.committed.slice(0, -1)
  };
}
