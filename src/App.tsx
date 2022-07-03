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
    props.toggle();
  };

  return (
    <div className="container">
      <div className="header">
        <div className="title">Settings</div>
        <button className="settings-button" onClick={props.toggle}>
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
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
    </div>
  );
}

function Main(props: any) {
  const [pageTitle, setPageTitle] = useState(props.pageTitle);

  chrome.runtime.sendMessage({ type: 'request-tab-info' }, (response) => {
    setPageTitle(response.pageTitle);
  });

  const handlePageTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPageTitle(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <div className="container">
      <div className="header">
        <div className="title">Markdown Web Clipper</div>
        <button className="settings-button" onClick={props.toggle}>
          <FontAwesomeIcon icon={faGear} />
        </button>
      </div>
      <textarea className="page-title-input" value={pageTitle} onChange={handlePageTitleChange} />
      <div className="footer">
        <div className="download-location">Save to: {props.settings.downloadLocation}</div>
        <button className="submit-button">Add</button>
      </div>
    </div>
  );
}

function App() {
  const [isSettingsShown, setIsSettingsShown] = useState(false);
  const [settings, setSettings] = useState({ downloadLocation: '~/Downloads' });

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'request-settings' }, (response) => {
      setSettings(response.settings);
    });
  }, []);

  const toggleSettings = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSettingsShown(!isSettingsShown);
  };

  return isSettingsShown ? (
    <Settings settings={settings} toggle={toggleSettings} />
  ) : (
    <Main settings={settings} toggle={toggleSettings} />
  );
}

export default App;
