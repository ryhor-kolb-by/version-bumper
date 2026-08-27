import { useState } from 'react'
import { bumpVersion } from './lib/version.js'
import './App.css'

const RELEASE_TYPES = ['patch', 'minor', 'major']

export default function App() {
  const [current, setCurrent] = useState('1.4.2')
  const [next, setNext] = useState(null)
  const [error, setError] = useState(null)

  function handleBump(type) {
    try {
      setNext(bumpVersion(current, type))
      setError(null)
    } catch (e) {
      setNext(null)
      setError(e.message)
    }
  }

  return (
    <main className="app">
      <h1>Version Bumper</h1>
      <p className="subtitle">Считаем следующую версию релиза</p>

      <label className="field">
        Текущая версия
        <input
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          placeholder="1.4.2"
        />
      </label>

      <div className="buttons">
        {RELEASE_TYPES.map((type) => (
          <button key={type} onClick={() => handleBump(type)}>
            {type}
          </button>
        ))}
      </div>

      {next && <output className="result">{next}</output>}
      {error && <p className="error">{error}</p>}

      <footer className="footer">
        <span>commit {__COMMIT_SHA__}</span>
        <span>env {__DEPLOY_ENV__}</span>
      </footer>
    </main>
  )
}
