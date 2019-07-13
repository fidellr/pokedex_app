import React from 'react';
import './index.css';

export default ({ children }) => (
  <div className="appLayout u-marginAuto u-relative">
    <nav className="appBar u-marginAuto u-fixed u-left0 u-top0 u-right0 u-fullWidth u-textAlignCenter u-boxShadowBottomBlack6 u-colorGhostWhite">
      <h2 className="u-marginNone u-paddingVertical20">Pokédex App</h2>
    </nav>
    <main className="appRootContent u-marginTop75 u-boxShadowBottomBlack6 u-minHeight100vh">
      {children}
    </main>
  </div>
);
