import { Warning } from '../../components/Warning';

export const ParameterChangewarning = () => {
  return (
    <Warning severity='info' sx={{ my: 6 }}>
      Attention: Parameter changes via governance can alter your account health factor and risk of
      liquidation.
    </Warning>
  );
};
