import * as React from 'react';
import { observer } from 'mobx-react';
import { Actions } from '../Overlay/style';
import store from '../../store';
import { Bubble } from '../Bubble';
import { onSiteClick } from '../../utils/dials';
import { ipcRenderer } from 'electron';

const openToolBox = () => {
  const urls = [
    'http://dx.7moor.com',
    'http://www.dankegongyu.com/admin/passenger/list',
    'https://www.danke.com/map/bj',
    'https://www.danke.com/room/bj'];
  urls.forEach((url, index) => {
    store.tabs.addTab({ url, active: (index === 0) });
    store.overlay.visible = false;
  });
};

const loadSmartWindow = () => {
  console.log('load smart window.');
  const html = `
  <h1>=== DanKe Smart Window ===</h1>
  `;
  ipcRenderer.send('smart-window-load', html);
};

export const DanKeToolBox = observer(() => {
  return (
    <Actions>
      <Bubble onClick={openToolBox} invert>
        电销全家桶
      </Bubble>
      <Bubble onClick={loadSmartWindow} invert>
        Load
      </Bubble>
    </Actions>
  );
});
