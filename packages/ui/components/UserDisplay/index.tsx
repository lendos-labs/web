import { Box } from '@mui/material';
import { UserNameText, UserNameTextProps } from './UserName';

interface UserDisplayProps {
  oneLiner?: boolean;
  titleProps?: Omit<UserNameTextProps, 'address' | 'domainName'>;
  subtitleProps?: Omit<UserNameTextProps, 'address' | 'domainName'>;
  withLink?: boolean;
}

export const UserDisplay = ({
  oneLiner = false,
  titleProps,
  subtitleProps,
  withLink,
}: UserDisplayProps) => {
  const { account, defaultDomain, domainsLoading, accountLoading } = useRootStore(
    state => ({
      account: state.account,
      defaultDomain: state.defaultDomain,
      domainsLoading: state.domainsLoading,
      accountLoading: state.accountLoading,
    }),
    shallow,
  );

  const loading = domainsLoading || accountLoading;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {!oneLiner && defaultDomain?.name ? (
          <>
            <UserNameText
              address={account}
              loading={loading}
              domainName={defaultDomain.name}
              variant='h4'
              link={withLink ? `https://etherscan.io/address/${account}` : undefined}
              {...titleProps}
            />
            <UserNameText
              address={account}
              loading={loading}
              variant='caption'
              {...subtitleProps}
            />
          </>
        ) : (
          <UserNameText
            address={account}
            domainName={defaultDomain?.name}
            loading={loading}
            link={withLink ? `https://etherscan.io/address/${account}` : undefined}
            {...titleProps}
          />
        )}
      </Box>
    </Box>
  );
};
