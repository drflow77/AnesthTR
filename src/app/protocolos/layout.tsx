import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Revisor de Protocolos — AnesthTR',
  description: 'Herramienta de revisión y creación de protocolos de investigación clínica en anestesiología.',
  robots: { index: false, follow: false },
};

export default function ProtocolosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
