/** Index
 * available pages are imported and exported here to simplify importing to AppRouting.
 * New pages is imported as shown below and thereafter exported.
 * See routing/Approuting.tsx for further implementation with the router
 *  */

import NotFoundPage from "./NotFoundPage";
import HomePage from "./HomePage";
import AuthenticationPage from "./AuthenticationPage";
import ChatDetailPage from "./chat/ChatDetailPage";
import ChatsPage from "../pages/chat/ChatsPage";
import SearchResultPage from "../pages/chat/SearchResultPage";
import PodcastGeneratorPage from "./podcast/PodcastGeneratorPage";
import PodcastLibraryPage from "./podcast/PocastLibraryPage";

export {
  NotFoundPage,
  ChatDetailPage,
  HomePage,
  AuthenticationPage,
  ChatsPage,
  SearchResultPage,
  PodcastGeneratorPage,
  PodcastLibraryPage,
};
