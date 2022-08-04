import { dummyProfile } from './dummy-profile';

export const formatBadges = ({ data: profileData, badges: maxBadges, loading }) => {
  let data = profileData || dummyProfile;
  if (loading) {
    data = dummyProfile;
  }

  /* eslint-disable */
  const result = (data.badges || [])
    .filter((badge) => badge.visibility === 'highlighted')
    .map(
      ({ language, rank, location_name, version, badgeFamily, badgeType, values }) => ({
        language: language || values.language,
        rank,
        location: location_name,
        version,
        badgeFamily,
        badgeType,
      }),
    )
    .slice(0, maxBadges);
  /* eslint-enable */
  result.sort((a, b) => {
    if (b.version === 'v1' && a.version === 'v2') return -1;
    return 0;
  });
  return result;
};
