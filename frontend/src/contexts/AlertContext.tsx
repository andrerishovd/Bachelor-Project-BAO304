import {
  createContext,
  useContext,
  useState,
  useCallback,
  type FC,
  type ReactNode,
} from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { X } from "tabler-icons-react";

type AlertType = "error" | "warning" | "success" | "info";

interface IAlert {
  message: string;
  type: AlertType;
}

/**
 * IAlertContext
 *
 * Defines the shape of the AlertContext.
 * Provides global alert state and actions to all child components.
 *
 * @property alert - Current alert object, null if no alert is active
 * @property showAlert - Displays an alert message of a given type, auto-dismisses after duration
 * @property showError - Shorthand for showAlert with type "error"
 * @property showWarning - Shorthand for showAlert with type "warning"
 * @property showSuccess - Shorthand for showAlert with type "success"
 * @property showInfo - Shorthand for showAlert with type "info"
 * @property clearAlert - Manually clears the current alert
 */
interface IAlertContext {
  alert: IAlert | null;
  showAlert: (message: string, type: AlertType, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
  clearAlert: () => void;
}

interface IProps {
  children: ReactNode;
}

const alertStyles: Record<AlertType, string> = {
  error: "alert-error",
  warning: "alert-warning",
  success: "alert-success",
  info: "alert-info",
};

const alertIcons: Record<AlertType, ReactNode> = {
  error: <XCircleIcon className="h-6 w-6 shrink-0" />,
  warning: <ExclamationTriangleIcon className="h-6 w-6 shrink-0" />,
  success: <CheckCircleIcon className="h-6 w-6 shrink-0" />,
  info: <InformationCircleIcon className="h-6 w-6 shrink-0" />,
};

export const AlertContext = createContext<IAlertContext | null>(null);

/**
 * AlertProvider
 *
 * Provides global alert state to the component tree.
 * Renders a DaisyUI alert banner when an alert is active.
 * Alerts auto-dismiss after a configurable duration (default: 4000ms).
 * Pass duration 0 to disable auto-dismiss.
 *
 * @param children - Child components that need access to alert state
 *
 * @example
 * // App.tsx
 * <AlertProvider>
 *   <AppRouting />
 * </AlertProvider>
 */
export const AlertProvider: FC<IProps> = ({ children }) => {
  const [alert, setAlert] = useState<IAlert | null>(null);

  const clearAlert = useCallback(() => setAlert(null), []);

  // Displays an alert and auto-dismisses after given duration
  const showAlert = useCallback(
    (message: string, type: AlertType, duration = 4000) => {
      setAlert({ message, type });
      if (duration > 0) {
        setTimeout(() => setAlert(null), duration);
      }
    },
    [],
  );

  const showError = useCallback(
    (message: string, duration?: number) =>
      showAlert(message, "error", duration),
    [showAlert],
  );

  const showWarning = useCallback(
    (message: string, duration?: number) =>
      showAlert(message, "warning", duration),
    [showAlert],
  );

  const showSuccess = useCallback(
    (message: string, duration?: number) =>
      showAlert(message, "success", duration),
    [showAlert],
  );

  const showInfo = useCallback(
    (message: string, duration?: number) =>
      showAlert(message, "info", duration),
    [showAlert],
  );

  return (
    <AlertContext.Provider
      value={{
        alert,
        showAlert,
        showError,
        showWarning,
        showSuccess,
        showInfo,
        clearAlert,
      }}
    >
      {children}

      {/* Global alert banner, renders at the top of the screen when active */}
      {alert && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 min-w-80 max-w-lg">
          <div
            role="alert"
            className={`alert ${alertStyles[alert.type]} shadow-lg`}
          >
            {alertIcons[alert.type]}
            <span>{alert.message}</span>
            <button onClick={clearAlert} className="btn btn-sm btn-ghost">
              <X />
            </button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};

/**
 * useAlertContext
 *
 * Custom hook for consuming AlertContext.
 * Must be used within an AlertProvider.
 *
 * @returns AlertContext value: { alert, showAlert, showError, showWarning, showSuccess, showInfo, clearAlert }
 * @throws Error if used outside of AlertProvider
 *
 * @example
 * const { showError, showSuccess } = useAlertContext();
 * showSuccess("Chat created!");
 * showError("Could not load chats");
 */
export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context)
    throw new Error("useAlertContext must be used within AlertProvider");
  return context;
};
