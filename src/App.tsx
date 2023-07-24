import StudyPage from "./pages/StudyPage";
import { store } from "./store";
import { Provider } from "react-redux";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StudyPage />
    </Provider>
  );
};

export default App;
