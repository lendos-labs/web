import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

type ButtonProps = {
  isPrimary?: boolean;
} & MuiButtonProps;

export const Button: React.FC<ButtonProps> = ({ isPrimary, ...props }) => {
  return (
    <MuiButton
      {...props}
      sx={(theme) => ({
        backgroundColor: isPrimary ? theme.brand.blue : 'secondary.main',
      })}
    />
  );
};
