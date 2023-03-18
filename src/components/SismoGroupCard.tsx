import { ISismoGroup } from '../types';
import { useContext } from 'react';
import TalentLayerContext from '../context/talentLayer';
import SismoHelpPopover from './SismoHelpPopover';

function SismoGroupCard({
  sismoGroupData,
  userAddrss,
}: {
  sismoGroupData: ISismoGroup;
  userAddrss: string;
}) {
  const { user } = useContext(TalentLayerContext);
  const isCOnnectedUser = () => {
    return user?.address === userAddrss;
  };

  return (
    <div className='rounded-xl p-4 border border-gray-200'>
      <div className='flex flex-col items-top justify-between gap-4 w-full'>
        <div className='flex flex-col justify-start items-start gap-4 relative'>
          <div className='flex items-center justify-start'>
            <img src={sismoGroupData.image} className='w-10 mr-4' />
            <div className='flex flex-col'>
              <p className='text-gray-900 font-medium'>{sismoGroupData.name}</p>
            </div>
            <SismoHelpPopover>
              <h3 className='font-semibold text-gray-900 dark:text-white'>
                How to get this Badge ?
              </h3>
              <p>
                <strong>Description:</strong> {sismoGroupData.description}
                <br />
                <br />
                <strong>Specs:</strong> {sismoGroupData.specs}
              </p>
            </SismoHelpPopover>
          </div>
        </div>

        {isCOnnectedUser() && (
          <div className='flex flex-row gap-4 justify-between items-center border-t border-gray-100 pt-4'>
            <a
              target={'_blank'}
              className={`${
                sismoGroupData.userInGroup
                  ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-500 hover:text-white'
                  : 'text-gray-400 bg-gray-200 pointer-events-none'
              } px-5 py-2 rounded-lg`}
              href={sismoGroupData.link}>
              Mint Badge
            </a>
            {sismoGroupData.userInGroup && (
              <img src={`/purple_checkmark.svg`} className='w-4 mr-4 rounded-full' />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SismoGroupCard;
