import ErrorButton from '../components/ErrorButton';
import {SearchSection} from '../components/SearchSection';

export const MainPage = () => {
  return (
    <div className="main-page" data-testid="main-page">
      <SearchSection />
      <ErrorButton />
    </div>
  );
}
