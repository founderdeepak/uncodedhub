import ServiceDetailPage from './ServiceDetailPage';

interface Props {
  onBook?: () => void;
}

export default function SinglePageService({ onBook }: Props) {
  return <ServiceDetailPage onBook={onBook} serviceKey="single-page-website" />;
}
