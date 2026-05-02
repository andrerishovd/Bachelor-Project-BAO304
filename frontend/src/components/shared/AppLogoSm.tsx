import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useSidebar } from "../../contexts/SidebarContext";
import AppLogoText from "./AppLogoText";
/**
 * AppLogoSm
 *
 * Displays the app name in the sidebar.
 * Shows short name when collapsed, full name when expanded.
 */
const AppLogoSm = () => {
  const navigate = useNavigate();
  const { isExtended } = useSidebar();

  return (
    <li>
      <button onClick={() => navigate("/")}>
        <AnimatePresence mode="wait">
          {isExtended ? (
            <motion.span
              key="long"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="whitespace-nowrap"
            >
              <AppLogoText size="sm" />
            </motion.span>
          ) : (
            <motion.span
              key="short"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <AppLogoText size="sm" short />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </li>
  );
};

export default AppLogoSm;
