import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import BrandIcon from '@/components/ui/BrandIcon';
import Icon from '@/components/ui/Icon';
import { coaching } from '@/lib/constants';

type CoachingCard = [string, 'ielts' | 'pte', 'coachingIELTS' | 'coachingPTE' | 'document' | 'people' | 'check' | 'clock' | 'folder' | 'screen'];
const groups: CoachingCard[][] = [
  [[coaching[0].name, 'ielts', 'coachingIELTS'], ['Listening & Reading', 'ielts', 'document'],
    ['Writing & Speaking', 'ielts', 'people'], ['Mock Tests & Tutor Feedback', 'ielts', 'check']],
  [[coaching[1].name, 'pte', 'coachingPTE'], ['Smart Techniques & Time Management', 'pte', 'clock'],
    ['Practice Materials', 'pte', 'folder'], ['Online Classes & Tutor-led Sessions', 'pte', 'screen']],
];

function Cards({ items }: { items: CoachingCard[] }) {
  return <div className="coaching-card-group">{items.map(([label, slug, symbol]) =>
    <Link className="coaching-card reveal" href={`/coaching/${slug}/`} key={label}>
      {symbol === 'coachingIELTS' || symbol === 'coachingPTE' ? <BrandIcon slot={symbol} /> : <Icon type={symbol} />}
      <h3>{label}</h3>
    </Link>
  )}</div>;
}

// Preserve the approved eight-card composition from the live static website.
export default function CoachingSection() {
  return <section className="section coaching-section" id="coaching"><div className="container">
    <SectionHeading label="IELTS & PTE COACHING" heading={<>Prepare for your<br />English language test.</>} />
    <div className="coaching-programs">
      <Cards items={groups[0]} />
      <div className="coaching-banner reveal"><h3>Migration Factor</h3>
        <div className="coaching-badge"><span>IELTS</span><span>PTE</span></div>
        <p>ONLINE CLASSES.<br />PERSONALIZED PREPARATION.</p>
      </div>
      <Cards items={groups[1]} />
    </div>
  </div></section>;
}
