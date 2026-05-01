// src/components/shared/PageContainer.tsx
import type { ReactNode } from "react";

type MaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "5xl";

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: MaxWidth;
}

/**
 * PageContainer
 *
 * Consistent wrapper used across all pages.
 * Centers content and constrains max width.
 *
 * @property children - Page content
 * @property maxWidth - Maximum width of the content (default: "2xl")
 *
 * @example
 * <PageContainer>
 *   <PageHeader ... />
 *   ...
 * </PageContainer>
 *
 * <PageContainer maxWidth="5xl">
 *   ...
 * </PageContainer>
 */
const PageContainer = ({ children, maxWidth = "2xl" }: PageContainerProps) => {
  return (
    <div className="flex flex-col h-full overflow-hidden items-center">
      <div
        className={`flex flex-col h-full overflow-hidden w-full max-w-${maxWidth}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
