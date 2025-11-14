import { Croissant_One } from 'next/font/google';

const croissantOne = Croissant_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-croissant-one',
});

export default function BlackjackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={croissantOne.variable}>
      {children}
    </div>
  );
}
