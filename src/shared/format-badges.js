import { dummyProfile } from './dummy-profile';

export const formatBadges = ({ data: profileData, badges: maxBadges, loading }) => {
  let data = profileData || dummyProfile;
  if (data.status === 'not_found' || data.status === 'generated' || loading) {
    data = dummyProfile;
  }
  const allBadges = data.badges;
  const badges = [];

  Object.keys(allBadges || {}).forEach((badgeslocation) => {
    Object.keys(allBadges[badgeslocation]).forEach((language) => {
      const badge = allBadges[badgeslocation][language];
      if (badge.visibility !== 'highlighted') return;
      if (badges.length === maxBadges) return;
      badges.push({
        rank: badge.rank,
        location: badge.location,
        language,
      });
    });
  });

  return badges;
};
