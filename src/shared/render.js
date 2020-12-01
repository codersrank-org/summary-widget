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
  const { fullName, avatar, worldWideAll, positionWorldWide, totalScore } = data;
  if (isNotRegistered) return '';

  const percentage = Math.min(
    Math.max(Math.ceil((positionWorldWide / worldWideAll) * 100), 1),
    100,
  );
  const tag = loading || isNotRegistered ? 'div' : 'a';
  const linkAttrs =
    loading || isNotRegistered
      ? ''
      : `href="https://profile.codersrank.io/user/${username}?utm_source=users&utm_medium=banner&utm_campaign=embedded_widget" rel="noreferrer noopener" target="_blank" title="Visit ${username}'s CodersRank profile"`;

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
      <div class="codersrank-summary-avatar" ${avatar ? `style="background-image: url(${avatar})"` : ''}></div>
      ` : ''}
      <div class="codersrank-summary-head-content">
        <div class="codersrank-summary-head-name">${fullName || username}</div>
        <div class="codersrank-summary-head-rank"><b>Top ${percentage}%</b> in Worldwide</div>
        <div class="codersrank-summary-head-rank"><b>${formatScore(totalScore)}</b> CodersRank score</div>
      </div>
    </div>
    ` : ''}
    ${badgesData.length ? /* html */`
    <div class="codersrank-summary-badges">
      ${badgesData.map((badge) => /* html */`
        <div class="codersrank-summary-badge">
          <div class="codersrank-summary-badge-rank">Top ${badge.rank}</div>
          <div class="codersrank-summary-badge-technology">
            <div class="codersrank-summary-badge-technology-logo">
              <img src="https://icon-widget.codersrank.io/api/${encodeURIComponent(badge.language)}"/>
            </div>
            <span class="codersrank-summary-badge-name">${badge.language}</span>
          </div>
          <div class="codersrank-summary-badge-location">${badge.location}</div>
        </div>
      `).join('')}
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
