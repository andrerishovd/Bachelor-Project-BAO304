import PodcastDetailList from "../components/podcast/PodcastDetailList";
import PodcastList from "../components/podcast/PodcastList";
import CalendarCard from "../components/shared/CalendarCard";

const HomePage = () => {
  return (
    <>
      <CalendarCard />
      <PodcastList />
      <PodcastDetailList />
    </>
  );
};
export default HomePage;
