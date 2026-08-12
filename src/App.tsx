import { SettingsForm } from './components/SettingsForm'
import './App.css'

function App() {
  return (
    <main className="app">
      <SettingsForm
        initialValues={{
          displayName: 'Alex Morgan',
          email: 'alex@example.com',
          bio: 'Building things on the web.',
        }}
      />
    </main>
  )
}

export default App
