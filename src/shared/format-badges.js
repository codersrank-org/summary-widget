import { dummyProfile } from './dummy-profile';

export const formatBadges = ({ data: profileData, badges: maxBadges, loading }) => {
  let data = profileData || dummyProfile;
  if (loading) {
    data = dummyProfile;
  }

  return (
    (data.badges || [])
      .filter((badge) => badge.visibility === 'highlighted')
      // eslint-disable-next-line
      .map(({ language, rank, location_name }) => ({
        language,
        rank,
        location: location_name,
      }))
      .slice(0, maxBadges)
  );
};
