import PodcastDetailList from "../components/podcast/PodcastDetailList";
import PodcastList from "../components/podcast/PodcastList";
import CalendarCard from "../components/shared/CalendarCard";
import EventsListCard from "../components/shared/EventsListCard";

const HomePage = () => {
  return (
    <>
      <CalendarCard />
      <PodcastList />
      <PodcastDetailList />
      <EventsListCard />
    </>
  );
};
export default HomePage;
