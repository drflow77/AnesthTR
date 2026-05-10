import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rol de Salas — AnesthTR',
  description: 'Generador de rol de salas diario con distribución de residentes.',
  robots: { index: false, follow: false },
};

export default function RolesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
