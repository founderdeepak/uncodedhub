import ServiceDetailPage from './ServiceDetailPage';

interface Props {
  onBook?: () => void;
}

export default function EcommerceService({ onBook }: Props) {
  return <ServiceDetailPage onBook={onBook} serviceKey="ecommerce-website" />;
}
