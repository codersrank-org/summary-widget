/* eslint-disable camelcase */
import { codersrRankLogo } from './codersrank-logo';
import { formatScore } from './format-score';

export const render = ({
  data,
  username,
  layout,
  badgesData,
  badgesLayout,
  showAvatar,
  showHeader,
  loading,
  branding,
} = {}) => {
  const isNotRegistered =
    data && (data.status === 'not_found' || data.status === 'generated');
  const isPlaceholder = loading || isNotRegistered;
  const { first_name, last_name, avatar_url, total_users, position, total_score } = data;
  if (isNotRegistered) return '';
  const fullName = [first_name, last_name].filter((l) => !!l).join(' ');

  const percentage = Math.min(
    Math.max(Math.ceil((position / total_users) * 100), 1),
    100,
  );
  const tag = loading || isNotRegistered ? 'div' : 'a';
  const linkAttrs =
    loading || isNotRegistered
      ? ''
      : `href="https://profile.codersrank.io/user/${username}?utm_source=users&utm_medium=banner&utm_campaign=embedded_widget" rel="noreferrer noopener" target="_blank" title="Visit ${username}'s CodersRank profile"`;

  const badgeSeniorityLabel = (label) => {
    return label
      .split('')
      .map((char, index) => {
        if (char === char.toUpperCase() && index !== 0) return ` ${char}`;
        return char;
      })
      .join('');
  };
  const badgeStreakLabel = (label) => {
    return label
      .split('')
      .map((char, index) => {
        if (char === char.toUpperCase() && index !== 0) return ` ${char}`;
        return char;
      })
      .join('');
  };

  // prettier-ignore
  const renderBadge = (badge) => {
    if (badge.version === 'v1') {
      return /* html */`
        <div class="codersrank-summary-badge codersrank-summary-badge-v1">
          <div class="codersrank-summary-badge-rank">Top ${badge.rank}</div>
          <div class="codersrank-summary-badge-technology">
            <div class="codersrank-summary-badge-technology-logo">
              <img src="https://icon-widget.codersrank.io/api/${encodeURIComponent(badge.language)}"/>
            </div>
            <span class="codersrank-summary-badge-name">${badge.language}</span>
          </div>
          <div class="codersrank-summary-badge-location">${badge.location}</div>
        </div>
      `;
    }
    if (badge.version === 'v2' && badge.badgeFamily === 'Seniority') {
      return /* html */`
        <div class="codersrank-summary-badge codersrank-summary-badge-v2 codersrank-summary-badge-${badge.badgeFamily.toLowerCase()}">
          <div class="codersrank-summary-badge-image">
            <img src="https://profile.codersrank.io/static/badgesV2/${badge.badgeFamily}/${badge.badgeType}.svg" />
          </div>
          <div class="codersrank-summary-badge-label">${badgeSeniorityLabel(badge.badgeType)}</div>
          <div class="codersrank-summary-badge-technology">
            <div class="codersrank-summary-badge-technology-logo">
              <img src="https://icon-widget.codersrank.io/api/${encodeURIComponent(badge.language)}"/>
            </div>
            <span class="codersrank-summary-badge-name">${badge.language}</span>
          </div>
        </div>
      `;
    }
    if (badge.version === 'v2' && badge.badgeFamily === 'Streak') {
      return /* html */`
        <div class="codersrank-summary-badge codersrank-summary-badge-v2 codersrank-summary-badge-${badge.badgeFamily.toLowerCase()}">
          <div class="codersrank-summary-badge-image">
            <img src="https://profile.codersrank.io/static/badgesV2/${badge.badgeFamily}/${badge.badgeType}.svg" />
          </div>
          <div class="codersrank-summary-badge-days">days</div>
          <div class="codersrank-summary-badge-label">${badgeStreakLabel(badge.badgeType)}</div>
        </div>
      `;
    }
    return '';
  }

  // prettier-ignore
  return /* html */`
    <${tag} ${linkAttrs} class="codersrank-summary codersrank-summary-${layout} codersrank-summary-badges-${badgesLayout} ${isPlaceholder ? ' codersrank-summary-placeholder' : ''}">
    ${loading ? `<div class="codersrank-summary-preloader"></div>` : ''}
    ${!loading && isNotRegistered ? `
      <div class="codersrank-summary-not-found">User not found</div>
    ` : ''}
    ${showHeader ? /* html */ `
    <div class="codersrank-summary-head${!badgesData.length ? ' codersrank-summary-head-only' : ''}">
      ${showAvatar ? /* html */ `
      <div class="codersrank-summary-avatar" ${avatar_url ? `style="background-image: url(${avatar_url})"` : ''}></div>
      ` : ''}
      <div class="codersrank-summary-head-content">
        <div class="codersrank-summary-head-name">${fullName || username}</div>
        <div class="codersrank-summary-head-rank"><b>Top ${percentage}%</b> in Worldwide</div>
        <div class="codersrank-summary-head-rank"><b>${formatScore(total_score)}</b> CodersRank score</div>
      </div>
    </div>
    ` : ''}
    ${badgesData.length ? /* html */`
    <div class="codersrank-summary-badges">
      ${badgesData.map(renderBadge).join('')}
    </div>
    ` : ''}
  </${tag}>
  ${branding ? /* html */`
  <div class="codersrank-summary-branding">
    <a href="https://codersrank.io" target="_blank" rel="noopener noreferrer">
      <span>Powered by </span>
      ${codersrRankLogo}
    </a>
  </div>
  ` : ''}
`;
};
