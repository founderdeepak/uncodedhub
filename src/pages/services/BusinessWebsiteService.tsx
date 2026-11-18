import ServiceDetailPage from './ServiceDetailPage';

interface Props {
  onBook?: () => void;
}

export default function BusinessWebsiteService({ onBook }: Props) {
  return <ServiceDetailPage onBook={onBook} serviceKey="business-website" />;
}
