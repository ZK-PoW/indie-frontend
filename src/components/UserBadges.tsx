import { useContext } from 'react';
import TalentLayerContext from '../context/talentLayer';
import useIsUserInSismoGroup from '../hooks/useIsUserInSismoGroup';
import useSismoBadgesPerAddress from '../hooks/useSismoBadgesPerAddress';
import { TALENTLAYER_GROUPS } from '../sismoGroupsData';
import { ISismoBadge, ISismoGroup, IUser } from '../types';
import SismoBadgeCard from './SismoBadgeCard';
import SismoGroupCard from './SismoGroupCard';

interface IProps {
  user: IUser;
}

function UserBadges({ user }: IProps) {
  const { user: currentUser } = useContext(TalentLayerContext);
  const sismoBadges = useSismoBadgesPerAddress(user.address);

  const groupsData: ISismoGroup[] = [...TALENTLAYER_GROUPS];

  if (user.address === currentUser?.address) {
    // TODO: clean that
    groupsData.map(group => {
      group.userInGroup = useIsUserInSismoGroup(group.id, user.address);
    });
  }

  return (
    <>
      {sismoBadges && sismoBadges.length > 0 && (
        <>
          <h2 className='mb-6 pb-4 border-b border-gray-gray-200 text-gray-900 font-medium'>
            {user.address === currentUser?.address ? 'Your badges' : 'Badges'}:
          </h2>
          <div className='flex mb-8'>
            {sismoBadges.map((badge: ISismoBadge, i: number) => {
              return <SismoBadgeCard key={i} sismoBadgeData={badge} />;
            })}
          </div>
        </>
      )}

      {user.address === currentUser?.address && groupsData.length > 0 && (
        <>
          <h2 className='mb-6 pb-4 border-b border-gray-gray-200 text-gray-900 font-medium mt-4'>
            All zkPOW badges:
          </h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
            {groupsData.map((groupData: ISismoGroup, i: number) => {
              return (
                <SismoGroupCard key={i} sismoGroupData={groupData} userAddrss={user.address} />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default UserBadges;
