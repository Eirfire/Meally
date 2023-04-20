import React from 'react';
import styles from '@styles/modules/Information.module.scss';
import Navbar from '@components/modules/Navbar';
import Footer from '@components/modules/Footer';
import Link from 'next/link';
export default function Privacy_Policy() {
  return (
    <>
      <main className={styles.main}>
        <h1>Privacy Policy</h1>
        <h2>Last updated: 4/8/23</h2>
        <p>
          At Meally we are committed to protecting you and your privacy while on
          our platform, and ensuring that your personal information is safe and
          secure. This privacy policy outlines the types of information we
          collect and how we use that information.
        </p>
        <ol>
          <li>
            Information we collect:
            <p>
              When you signup to our website we collect the information you
              provide to us voluntarily. This information includes your name,
              email address and profile picture. These are provided from the
              service you sign in with for example but are not limited to
              Google, Facebook or Github which providers give us when you sign
              in. We also collect information on the recipes you have clicked
              on, made or created which is not shared with anyone and is kept on
              our platform only.
            </p>
          </li>
          <li>
            Use of information:
            <p>
              We use the data that we collect from the recipes you have made and
              created to optimize suggested recipes for you and only for you to
              improve your experience while on our platform. Cookies and
              Tracking Technologies: On Meally we strive to provide a free
              service always however to keep this service up and running we need
              to generate money to pay the bills this is where Advertisements
              come in which are provided by{' '}
              <Link
                href="https://adsense.google.com/start/"
                target='_black'
                className="underline underline-offset-0 text-blue"
              >
                Adsense
              </Link>
              . Along with Advertisements we also collect analytics on different
              measures to improve our overall experience for users.
            </p>
          </li>
          <li>
            Sharing of information:
            <p>
              Sharing of information: We do not share any of your personal
              information with any third party for their own marketing purposes.
              However, we may share your information with our service providers
              who assist us in providing you with our products and services. We
              may also share your information if we are required to do so by law
              or if we believe that such action is necessary to protect our
              rights or the rights of others
            </p>
          </li>
          <li>
            Data security:
            <p>
              We take many measures to protect your personal information from
              unauthorized access, use, and disclosure. However, please note
              that no method of transmission over the Internet or electronic
              storage is completely secure, and we cannot guarantee the absolute
              security of your information. However, we guarantee that we will
              take all measures that we can to make sure your data is safe.
            </p>
          </li>
          <li>
            Your choices:
            <p>
              You have the right to opt out of receiving marketing
              communications from us at any time, this may include: new letters,
              updates, etc. You can also request to view your information at any
              time, please do note that it can take up to 24 hours to process
              and be sent to you. Along with this, you have the option to delete
              your account from Meally, this, however, won’t delete your recipes
              read more{' '}
              <Link
                href="/info/terms_services"
                target='_black'
                className="underline underline-offset-0 text-blue"
              >
                here
              </Link>
              .
            </p>
          </li>
          <li>
            Changes to the privacy policy:
            <p>
              We may update this Privacy Policy from time to time. If we make
              any material changes to the policy, we will notify you by posting
              a notice on our website and by sending you an email.
            </p>
          </li>
        </ol>
      </main>
      <Footer />
    </>
  );
}