import { insertOrUpdate, find } from '../../data-access/index.js';

export const footer = () => {
  const footerEl = document.createElement('div');
  footerEl.id = 'footer';
  footerEl.classList.add('footer');
  footerEl.innerHTML = `
  <div class="user-menu"><span class="user-menu_profile-pic"></span>
  <button id="btn-add-channel">
    Add channel
  </button>
  <span class="user-menu_username">${find('username')}</span></div>
  <div class="input-box">
    <input id="chat-field" class="input-box_text" type="text"/>
  </div>
  `;
  return footerEl;
};
