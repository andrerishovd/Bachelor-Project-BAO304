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

const HomePage = () => {
  const [items, setItems] = useState([
    "calendar",
    "events",
    "podcast",
    /*  "podcastDetail", */
    "generatePodcastCard",
  ]);

  //

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
    podcastDetail: <PodcastDetailList />,
    generatePodcastCard: <GeneratePodcastCard />,
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
