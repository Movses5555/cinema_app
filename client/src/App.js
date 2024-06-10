import { BrowserRouter as Router } from 'react-router-dom'
import { Layout } from './components/layout';
import { AppRoutes } from './routes'
 
function App() {
  return (
    <div className="h-screen w-full">
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
