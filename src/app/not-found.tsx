/**
 * Root 404 route. Server Component rendered by Next.js when no route matches.
 */
import { NotFoundView } from "@/components/templates/NotFoundView";

/**
 * Renders the not-found template for unmatched routes.
 *
 * @returns The 404 view.
 */
export default function NotFound() {
  return <NotFoundView />;
}
