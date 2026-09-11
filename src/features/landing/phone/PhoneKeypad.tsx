import { KEYPAD_MAP, KeypadDigit } from "@/lib/phone/multitap";

type PhoneKeypadProps = {
  onDigit: (digit: KeypadDigit) => void;
  onBack: () => void;
  onOk: () => void;
  onSend: () => void;
  canConnect: boolean;
  disabled?: boolean;
};

const keys: Array<{ value: string; digit?: KeypadDigit }> = [
  { value: "1" },
  { value: "2", digit: "2" },
  { value: "3", digit: "3" },
  { value: "4", digit: "4" },
  { value: "5", digit: "5" },
  { value: "6", digit: "6" },
  { value: "7", digit: "7" },
  { value: "8", digit: "8" },
  { value: "9", digit: "9" },
  { value: "*" },
  { value: "0" },
  { value: "#" }
];

export function PhoneKeypad({ onDigit, onBack, onOk, onSend, canConnect, disabled = false }: PhoneKeypadProps) {
  return (
    <div className="phone-controls" aria-label="Multi-tap phone keypad">
      <div className="phone-nav-pad">
        <button type="button" onClick={onSend} className="phone-soft phone-soft-send" disabled={disabled}>
          Send
        </button>
        <button
          type="button"
          onClick={onOk}
          disabled={disabled || !canConnect}
          aria-label="OK / connect when HEWEN is entered"
          className="phone-ok focus-ring"
        >
          OK
        </button>
        <button type="button" onClick={onBack} disabled={disabled} className="phone-soft phone-soft-back focus-ring">
          Back
        </button>
      </div>
      <div className="phone-number-pad">
        {keys.map((key) => (
          <button
            type="button"
            key={key.value}
            disabled={disabled || !key.digit}
            onClick={() => key.digit && onDigit(key.digit)}
            aria-label={key.digit ? `${key.value}: ${KEYPAD_MAP[key.digit].join(", ")}` : key.value}
            className="phone-key focus-ring"
          >
            <span>{key.value}</span>
            {key.digit ? <small>{KEYPAD_MAP[key.digit].join("")}</small> : <small>&nbsp;</small>}
          </button>
        ))}
      </div>
    </div>
  );
}
