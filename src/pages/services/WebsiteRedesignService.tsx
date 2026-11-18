import ServiceDetailPage from './ServiceDetailPage';

interface Props {
  onBook?: () => void;
}

export default function WebsiteRedesignService({ onBook }: Props) {
  return <ServiceDetailPage onBook={onBook} serviceKey="website-redesign" />;
}
