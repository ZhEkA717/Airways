import { SEARCH_REDUCER_KEY, SearchState } from './reducers/search.reducer';
import { SETTINGS_REDUCER_KEY, SettingsState } from './reducers/settings.reducer';

export interface State {
  [SEARCH_REDUCER_KEY]: SearchState,
  [SETTINGS_REDUCER_KEY]: SettingsState,
}
