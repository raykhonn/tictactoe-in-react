import { createRoot } from 'react-dom/client';

import 'assets/App.css';
import Main from 'main';

const root = createRoot(document.getElementById('root')!);

root.render(<Main />);
