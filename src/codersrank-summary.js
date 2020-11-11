/* eslint-disable max-classes-per-file */
import { fetchData } from './shared/fetch-data';
import { render } from './shared/render';
import { renderError } from './shared/render-error';
import { renderLoading } from './shared/render-loading';
import { formatBadges } from './shared/format-badges';
import { dummyProfile } from './shared/dummy-profile';

// eslint-disable-next-line
const STATE_IDLE = 0;
const STATE_LOADING = 1;
const STATE_ERROR = 2;
const STATE_SUCCESS = 3;

const BADGE_WIDE_WIDTH = 380;

// eslint-disable-next-line
const STYLES = `$_STYLES_$`;

// eslint-disable-next-line
class CodersrankSummary extends HTMLElement {
  constructor() {
    super();

    this.shadowEl = this.attachShadow({ mode: 'closed' });
    this.tempDiv = document.createElement('div');

    this.stylesEl = document.createElement('style');
    this.stylesEl.textContent = STYLES;
    this.shadowEl.appendChild(this.stylesEl);

    this.onResize = this.onResize.bind(this);

    this.mounted = false;

    this.state = STATE_IDLE;

    this.data = null;
    this.width = 0;
  }

  static get observedAttributes() {
    return ['username', 'logos', 'grid', 'max-items'];
  }

  get username() {
    return this.getAttribute('username');
  }

  set username(value) {
    this.setAttribute('username', value);
  }

  get layout() {
    const layout = this.getAttribute('layout');
    if (layout === 'vertical') return 'vertical';
    if (layout === 'horizontal') return 'horizontal';
    if (this.width < this.minWidth) return 'vertical';
    return 'horizontal';
  }

  set layout(value) {
    this.setAttribute('layout', value);
  }

  get badges() {
    const badges = this.getAttribute('badges');
    if (badges !== null && badges !== '') return parseInt(badges, 10);
    return 3;
  }

  set badges(value) {
    this.setAttribute('badges', value);
  }

  get badgesData() {
    const { data, badges, state } = this;
    return formatBadges({ data, badges, loading: state === STATE_LOADING });
  }

  get badgesLayout() {
    const { width, badgesData, layout, badgeMinWidth } = this;
    const badgeWidth = (width - 16 - (badgesData.length - 1) * 8) / badgesData.length;
    let badgesLayout = 'horizontal';
    if (layout === 'horizontal' && badgeWidth < badgeMinWidth) {
      badgesLayout = 'vertical';
    } else if (layout === 'horizontal' && badgeWidth >= BADGE_WIDE_WIDTH) {
      badgesLayout = 'horizontal-wide';
    }
    return badgesLayout;
  }

  get showAvatar() {
    const showAvatar = this.getAttribute('show-avatar');
    return showAvatar !== 'false';
  }

  set showAvatar(value) {
    this.setAttribute('show-avatar', value);
  }

  set ['show-avatar'](value) {
    this.setAttribute('show-avatar', value);
  }

  get showHeader() {
    const showHeader = this.getAttribute('show-header');
    return showHeader !== 'false';
  }

  set showHeader(value) {
    this.setAttribute('show-header', value);
  }

  set ['show-head'](value) {
    this.setAttribute('show-header', value);
  }

  get minWidth() {
    let minWidth = parseInt(this.getAttribute('min-width'), 10);
    if (!minWidth || Number.isNaN(minWidth)) minWidth = 300;
    return minWidth;
  }

  set minWidth(value) {
    this.setAttribute('min-width', value);
  }

  set ['min-width'](value) {
    this.setAttribute('min-width', value);
  }

  get badgeMinWidth() {
    let minWidth = parseInt(this.getAttribute('badge-min-width'), 10);
    if (!minWidth || Number.isNaN(minWidth)) minWidth = 100;
    return minWidth;
  }

  set badgeMinWidth(value) {
    this.setAttribute('badge-min-width', value);
  }

  set ['badge-min-width'](value) {
    this.setAttribute('badge-min-width', value);
  }

  render() {
    const {
      username,
      mounted,
      state,
      shadowEl,
      data,
      layout,
      badgesData,
      badgesLayout,
      showAvatar,
      showHeader,
    } = this;
    const ctx = {
      username,
      data: data || dummyProfile,
      layout,
      badgesData,
      badgesLayout,
      showAvatar,
      showHeader,
    };

    if (!username || !mounted) return;
    if (state === STATE_SUCCESS) {
      this.tempDiv.innerHTML = render(ctx);
    } else if (state === STATE_ERROR) {
      this.tempDiv.innerHTML = renderError(ctx);
    } else if (state === STATE_IDLE || state === STATE_LOADING) {
      this.tempDiv.innerHTML = renderLoading(ctx);
    }

    let widgetEl = shadowEl.querySelector('.codersrank-summary');
    if (widgetEl) {
      widgetEl.parentNode.removeChild(widgetEl);
    }
    widgetEl = this.tempDiv.querySelector('.codersrank-summary');
    if (!widgetEl) return;
    this.widgetEl = widgetEl;
    shadowEl.appendChild(widgetEl);
  }

  loadAndRender() {
    const { username } = this;
    this.state = STATE_LOADING;
    this.render();
    fetchData(username)
      .then((data) => {
        this.data = data;
        this.state = STATE_SUCCESS;
        this.render();
      })
      .catch(() => {
        this.state = STATE_ERROR;
        this.render();
      });
  }

  onResize() {
    if (!this.widgetEl) return;
    this.width = this.offsetWidth;
    const { layout, badgesLayout } = this;
    if (layout === 'horizontal') {
      this.widgetEl.classList.remove('codersrank-summary-vertical');
    } else {
      this.widgetEl.classList.remove('codersrank-summary-horizontal');
    }
    if (badgesLayout === 'horizontal') {
      this.widgetEl.classList.remove('codersrank-summary-badges-vertical');
    } else {
      this.widgetEl.classList.remove('codersrank-summary-badges-horizontal');
    }
    this.widgetEl.classList.add(`codersrank-summary-${layout}`);
    this.widgetEl.classList.add(`codersrank-summary-badges-${badgesLayout}`);
  }

  attributeChangedCallback() {
    if (!this.mounted) return;
    this.loadAndRender();
  }

  connectedCallback() {
    window.addEventListener('resize', this.onResize);
    this.width = this.offsetWidth;
    this.mounted = true;
    this.loadAndRender();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.onResize);
    this.mounted = false;
  }
}

// eslint-disable-next-line
class CodersrankWidget extends CodersrankSummary {}

// EXPORT
