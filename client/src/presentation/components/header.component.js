import { find } from '../../data-access/index.js';

export const header = () => {
  const headerEl = document.createElement('div');
  headerEl.classList.add('header');
  headerEl.id = 'header';
  headerEl.innerHTML = getHeaderInnerHtml();
  return headerEl;
};

export const getHeaderInnerHtml = () => {
  return `
<div class="team-menu">Team Awesome</div>
<div class="channel-menu"><span class="channel-menu_name"><span class="channel-menu_prefix">#</span>                ${find(
    'currentChannelName',
  )}</span></div>
  `;
};
