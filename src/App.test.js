import MyApp from './App';
import * as ReactDOM from "react-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyApp />, div);
  ReactDOM.unmountComponentAtNode(div);
})
