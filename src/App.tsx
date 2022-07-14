import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faX } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function saveToFile(response: { data: string; path: string; saveAs: boolean }): void {
  const blob = new Blob([response.data], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const downloadOptions = {
    url: url,
    filename: response.path,
    saveAs: response.saveAs,
  };
  chrome.downloads.download(downloadOptions);
}

function Settings(props: any) {
  const [settings, setSettings] = useState(props.settings);

  const handleDownloadLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ downloadLocation: e.target.value });
  };

  const handleSaveAsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ saveAs: e.target.checked });
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
          <div className="setting-name">Download subfolder</div>
          <input
            type="text"
            className="setting-value"
            value={settings.downloadLocation}
            onChange={handleDownloadLocationChange}
          />
        </div>
        <div className="setting">
          <div className="setting-name">Ask for save location</div>
          <input
            type="checkbox"
            className="setting-value"
            checked={settings.saveAs}
            onChange={handleSaveAsChange}
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
  const [tabInfo, setTabInfo] = useState({ pageTitle: 'Title', url: '' });

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'request-tab-info' }, (response) => {
      setTabInfo(response);
    });
  }, []);

  const handlePageTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTabInfo({ pageTitle: e.target.value, url: tabInfo.url });
  };

  const savePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    chrome.runtime.sendMessage(
      { type: 'request-save-page', pageTitle: tabInfo.pageTitle },
      (response) => {
        saveToFile(response);
      }
    );
  };

  return (
    <div className="container">
      <div className="header">
        <div className="title">Markdown Web Clipper</div>
        <button className="settings-button" onClick={props.toggle}>
          <FontAwesomeIcon icon={faGear} />
        </button>
      </div>
      <textarea
        className="page-title-input"
        value={tabInfo.pageTitle}
        onChange={handlePageTitleChange}
      />
      <div className="footer">
        <div className="download-location">
          {props.settings.saveAs ? '' : `Save to: ${props.settings.downloadLocation}`}
        </div>
        <button className="submit-button" onClick={savePage}>
          Add
        </button>
      </div>
    </div>
  );
}

function App() {
  const [isSettingsShown, setIsSettingsShown] = useState(false);
  const [settings, setSettings] = useState({ downloadLocation: '', saveAs: false });

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'request-settings' }, (response) => {
      setSettings(response.settings);
    });
  }, [settings]);

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
