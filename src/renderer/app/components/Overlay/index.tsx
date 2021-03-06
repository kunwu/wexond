import { observer } from 'mobx-react';
import * as React from 'react';

import store from '../../store';
import {
  StyledOverlay,
  HeaderText,
  HeaderArrow,
  Scrollable,
  Title,
  Content,
  Container,
} from './style';
import { SearchBox } from '../SearchBox';
import { TabGroups } from '../TabGroups';
import { WeatherCard } from '../WeatherCard';
import { History } from '../History';
import { Bookmarks } from '../Bookmarks';
import { Dial } from '../Dial';
import { QuickMenu } from '../QuickMenu';
import { DownloadsSection } from '../DownloadsSection';
import { DanKeToolBox } from '../DanKeToolBox';

export const Header = ({ children, clickable }: any) => {
  return (
    <HeaderText clickable={clickable}>
      {children}
      {clickable && <HeaderArrow />}
    </HeaderText>
  );
};

const onClick = () => {
  if (store.tabGroups.currentGroup.tabs.length > 0) {
    store.overlay.visible = false;
  }
  store.overlay.dialTypeMenuVisible = false;
};

export const preventHiding = (e: any) => {
  e.stopPropagation();
  store.overlay.dialTypeMenuVisible = false;
};

export const Overlay = observer(() => {
  return (
    <StyledOverlay visible={store.overlay.visible} onClick={onClick}>
      <Container
        visible={
          store.overlay.currentContent === 'default' && store.overlay.visible
        }
      >
        <Scrollable ref={store.overlay.scrollRef}>
          <Content>
            <SearchBox />
            <DanKeToolBox />
            <Dial />
            <Title>Overview</Title>
            <TabGroups />
            {store.downloads.list.length > 0 && <DownloadsSection />}
            <QuickMenu />
          </Content>
        </Scrollable>
      </Container>
      <History />
      <Bookmarks />
    </StyledOverlay>
  );
});
