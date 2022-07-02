import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faX } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function Settings(props: any) {
  const [settings, setSettings] = useState(props.settings);

  const handleDownloadLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ downloadLocation: e.target.value });
  };

  const saveSettings = (_e: React.MouseEvent<HTMLButtonElement>) => {
    chrome.storage.sync.set(settings);
  };

  return (
    <>
      <div className="settings-container">
        <div className="setting">
          <div className="setting-name">Download location</div>
          <input
            type="text"
            className="setting-value"
            value={settings.downloadLocation}
            onChange={handleDownloadLocationChange}
          />
        </div>
      </div>
      <div className="settings-footer">
        <button className="save-settings" onClick={saveSettings}>
          Save
        </button>
      </div>
    </>
  );
}

function Main(props: any) {
  const [articleTitle, setArticleTitle] = useState('Placeholder');

  const handleArticleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArticleTitle(e.target.value);
  };

  return (
    <>
      <textarea
        className="article-title-input"
        value={articleTitle}
        onChange={handleArticleTitleChange}
      />
      <div className="footer">
        <div className="download-location">Save to: {props.settings.downloadLocation}</div>
        <button className="submit-button">Add</button>
      </div>
    </>
  );
}

function App() {
  const [isSettingsShown, setIsSettingsShown] = useState(false);
  const [settings, setSettings] = useState({ downloadLocation: '~/Downloads' });

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'request-settings' }, (response) => {
      setSettings(response.settings);
    });
  });

  const toggleSettings = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSettingsShown(!isSettingsShown);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="title">{isSettingsShown ? 'Settings' : 'Markdown Web Clipper'}</div>
        <button className="settings-button" onClick={toggleSettings}>
          {isSettingsShown ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faGear} />}
        </button>
      </div>
      {isSettingsShown ? <Settings settings={settings} /> : <Main settings={settings} />}
    </div>
  );
}

export default App;
