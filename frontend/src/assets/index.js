import darkLogo from './darkLogo.webp';
import logo from './logo.webp';
import heroImg from './heroImg.webp';
import contactUs from './contactUs.webp';
import menuIcon from './menuIcon.svg';
import closeMenu from './closeMenu.svg';
import whatsapp from './whatsapp.svg';
import wechat from './wechat.svg';
import dummyUserImg from './dummyUserImg.webp';
import liveAuctions from './liveAuctions.webp';
import soldAuctions from './soldAuctions.webp';
import endingSoonAuctions from './endingSoonAuctions.webp';
import upcomingAuctions from './upcomingAuctions.webp';
import about from './about.webp';
import spinner from './spinner.png';

function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}
// (202) 555-0125

const otherData = {
    phone: '2139483852',
    whatsapp: '2139483852',
    whatsappLink: 'https://wa.me/12139483852',
    phoneCode: '+1',
    email: 'admin@hangerstock.com',
    wechat: 'hangerstock',
    address: 'USA',
    brandName: 'HangerStock',
    formatPhone
}

export {
    otherData,
    about,
    darkLogo,
    logo,
    heroImg,
    menuIcon,
    closeMenu,
    whatsapp,
    wechat,
    contactUs,
    dummyUserImg,
    liveAuctions,
    soldAuctions,
    endingSoonAuctions,
    upcomingAuctions,
    spinner,
};