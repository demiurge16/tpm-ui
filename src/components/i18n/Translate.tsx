import { TFunction } from "i18next";

export interface TranslateProps {
  t: TFunction;
  tKey: string;
}

export const Translate = ({ t, tKey }: TranslateProps) => {
  return (
    <>
      {t(tKey)}
    </>
  );
};
