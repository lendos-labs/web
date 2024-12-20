import { Box } from '@mui/material';
import { UserNameText, UserNameTextProps } from './UserName';
import { useAccountContext } from '../../providers/AccountProvider';

interface UserDisplayProps {
  titleProps?: Omit<UserNameTextProps, 'address' | 'domainName'>;
  withLink?: boolean;
}

export const UserDisplay = ({ titleProps, withLink }: UserDisplayProps) => {
  const { account, loading } = useAccountContext();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <UserNameText
          address={account ?? ''}
          loading={loading}
          link={withLink ? `https://etherscan.io/address/${account}` : undefined}
          {...titleProps}
        />
      </Box>
    </Box>
  );
};
