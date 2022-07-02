import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faX, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function DownloadLocation(props: any) {
  return (
    <div className="download-location-container">
      <FontAwesomeIcon className={props.isDefault ? 'default' : 'option'} icon={faStar} />
      <div className="path">{props.path}</div>
      <FontAwesomeIcon icon={faTrash} />
    </div>
  );
}

function Settings(props: any) {
  const downloadLocations: { path: string; isDefault: boolean }[] = props.downloadLocations;
  return (
    <>
      <div className="setting-header">
        <div className="subtitle">Download locations</div>
        <button className="add-download-location">Add</button>
      </div>
      <div className="download-locations-list-container">
        {downloadLocations.map((loc) => {
          return <DownloadLocation key={loc.path} path={loc.path} isDefault={loc.isDefault} />;
        })}
      </div>
    </>
  );
}

function Main(props: any) {
  const [articleTitle, setArticleTitle] = useState('Placeholder');
  const [downloadLocation, setDownloadLocation] = useState('default');

  const handleArticleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArticleTitle(e.target.value);
  };

  const handleDownloadLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDownloadLocation(e.target.value);
  };

  return (
    <>
      <textarea
        className="article-title-input"
        value={articleTitle}
        onChange={handleArticleTitleChange}
      />
      <div className="footer">
        <select
          className="download-location-dropdown"
          value={downloadLocation}
          onChange={handleDownloadLocationChange}
        >
          <option className="download-location-option" value="default">
            Default
          </option>
        </select>
        <button className="submit-button">Add</button>
      </div>
    </>
  );
}

function App() {
  const [isSettingsShown, setIsSettingsShown] = useState(true);

  const downloadLocations = [
    { path: '~/obsidian/personal/tweets', isDefault: false },
    { path: '~/obsidian/personal/long_reads', isDefault: true },
    { path: '~/obsidian/work/docs', isDefault: false },
  ];

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
      {isSettingsShown ? <Settings downloadLocations={downloadLocations} /> : <Main />}
    </div>
  );
}

export default App;
