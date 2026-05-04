import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, type ReactNode } from "react";
import CalendarCard from "../components/homepage/CalendarCard";
import EventsListCard from "../components/homepage/EventsListCard";
import PodcastList from "../components/homepage/PodcastList";
import PodcastDetailList from "../components/podcast/PodcastDetailList";
import GeneratePodcastCard from "../components/podcast/GeneratePodcastCard";
import HyperlinkCard from "../components/homepage/HyperlinkCard";
/**
 * SortableCard Component
 *
 * Wrapper component that makes any child component draggable and sortable.
 * Uses @dnd-kit/sortable for drag-and-drop functionality.
 *
 * @param id - Unique identifier for the card (used for sorting)
 * @param children - The card content to be rendered
 *
 * @library @dnd-kit/sortable
 * @see {@link https://docs.dndkit.com/presets/sortable DnD Kit Sortable Documentation}
 */

const SortableCard = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

/**
 * HomePage Component
 *
 * Dashboard with draggable and sortable cards.
 * Users can rearrange cards by dragging them to customize their layout.
 *
 * @features
 * - Drag-and-drop card reordering
 * - Responsive grid layout (1/2/3 columns based on screen size)
 * - Persistent card order (could be saved to localStorage)
 *
 * @cards Available dashboard cards:
 * - calendar: Shows upcoming events in a calendar view
 * - events: List of upcoming events with time indicators
 * - podcast: List of podcast episodes
 * - generatePodcastCard: AI podcast generation tool
 *
 * @library @dnd-kit
 * Drag-and-drop library for React with accessibility support.
 * - DndContext: Provides drag-and-drop context
 * - SortableContext: Enables sorting behavior
 * - closestCenter: Collision detection algorithm
 * - arrayMove: Utility for reordering arrays
 *
 * @example
 * // To add a new card:
 * 1. Add component to imports
 * 2. Add ID to items array: "myNewCard"
 * 3. Add mapping to components object: myNewCard: <MyNewCard />
 */

const HomePage = () => {
  const [items, setItems] = useState([
    "calendar",
    "events",
    "podcast",
    /*  "podcastDetail", */
    "generatePodcastCard",
    "links",
  ]);

  /**
   * Handles the end of a drag operation.
   * Reorders the items array based on where the card was dropped.
   */

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const components: Record<string, ReactNode> = {
    calendar: <CalendarCard />,
    events: <EventsListCard />,
    podcast: <PodcastList />,
    podcastDetail: <PodcastDetailList podcasts={[]} />,
    generatePodcastCard: <GeneratePodcastCard />,
    links: <HyperlinkCard />,
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {items.map((id) => (
            <SortableCard key={id} id={id}>
              {components[id]}
            </SortableCard>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default HomePage;
