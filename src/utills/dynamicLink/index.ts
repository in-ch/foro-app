import dynamicLinks from '@react-native-firebase/dynamic-links';

async function buildLink() {
  const link = await dynamicLinks().buildLink({
    link: 'http://www.2hw.co.kr',
    // domainUriPrefix is created in your Firebase console
    domainUriPrefix: 'https://foodzeroapp.page.link',
    analytics: {
      campaign: 'banner',
    },
  });

  return link;
}

export default buildLink;
