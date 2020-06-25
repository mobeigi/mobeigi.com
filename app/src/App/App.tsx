import React from 'react';

import Header from '../shared/components/Header';
import SocialButtonGroup from '../shared/components/SocialButtonGroup';
import SocialButton from '../shared/components/SocialButtonGroup/SocialButton';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../shared/assets/bootstrap-themes/slate.min.css';
import '../shared/styles/reset.css';
import '../shared/styles/styles.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <main>
        <Header />
        <br />
        <SocialButtonGroup />
        <p>My Stuff</p>
        <div className="icons-social" style={{ maxWidth: '400px' }}>
          <a href="/blog/" title="Mo Beigi's Blog" aria-label="Mo Beigi's Blog"><SocialButton brandStyle="fas" iconName="fa-blog" iconSize="fa-3x" /></a>
          <a href="https://paste.mobeigi.com" title="Mo's Privatebin" aria-label="Mo's Privatebin">
            <SocialButton brandStyle="fas" iconName="fa-paste" iconSize="fa-3x" />
          </a>
          <a href="https://mobeigi.atlassian.net/" title="Mo's Jira" aria-label="Mo's Jira"><SocialButton brandStyle="fab" iconName="fa-jira" iconSize="fa-3x" /></a>
          <a href="https://mobeigi.atlassian.net/wiki" title="Mo's Confluence" aria-label="Mo's Confluence"><SocialButton brandStyle="fab" iconName="fa-confluence" iconSize="fa-3x" /></a>
          <a href="/trades/" title="Trades" aria-label="Trades"><SocialButton brandStyle="fas" iconName="fa-chart-line" iconSize="fa-3x" /></a>
          <a href="#resume" title="Mo Beigi's Résumé" rel="external nofollow" data-toggle="modal" data-target="#resume" aria-label="Resume"><SocialButton brandStyle="fas" iconName="fa-file-certificate" iconSize="fa-3x" /></a>
          <a href="/sec/mo-beigi-pgp-pub.asc" title="Mo's PGP Key" aria-label="Mo's PGP Key"><SocialButton brandStyle="fas" iconName="fa-key" iconSize="fa-3x" /></a>
          <a href="/blog/contact/" title="Contact Me" aria-label="Contact Me"><SocialButton brandStyle="fas" iconName="fa-envelope" iconSize="fa-3x" /></a>
        </div>
      </main>
      <footer />
    </div>
  );
}

export default App;
