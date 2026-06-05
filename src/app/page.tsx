import { ServicesSection } from "@/components/services-section";
import { CustomerReviewsSection } from "@/components/customer-reviews-section";
import { TelegramContactSection } from "@/components/telegram-contact-section";

export default function Home() {
  return (
    <>
      <ServicesSection />
      <CustomerReviewsSection />
      <TelegramContactSection />
    </>
  );
}
