import { insertOrUpdate, find } from '../../data-access/index.js';
import { channelListing } from './channel-listings.component.js';
import { footer } from './footer.component.js';
import { header } from './header.component.js';
import { messageHistory } from './message-history.component.js';

export const homePage = async () => {
  const el = document.createElement('div');
  el.style = 'height:100%;';

  const headerEl = header();
  el.appendChild(headerEl);

  const mainEl = document.createElement('div');
  mainEl.classList.add('main');

  const channelListingsEl = channelListing();
  mainEl.appendChild(channelListingsEl);

  const messageHistoryEl = messageHistory();
  mainEl.appendChild(messageHistoryEl);

  el.appendChild(mainEl);

  const footerEl = footer();
  el.appendChild(footerEl);

  return el;
};
