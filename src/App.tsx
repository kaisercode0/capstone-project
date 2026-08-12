import { SettingsForm } from './components/SettingsForm'
import './App.css'

function App() {
  return (
    <main className="app">
      <SettingsForm
        initialValues={{
          displayName: 'Alex Morgan',
          email: 'alex@example.com',
        }}
      />
    </main>
  )
}

export default App
