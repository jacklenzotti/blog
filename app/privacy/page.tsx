import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Jack Lenzotti's apps and games.",
};

export default function Privacy() {
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-8">
          Last updated: February 10, 2026
        </p>

        <div className="space-y-6 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Overview
            </h2>
            <p>
              Jack Lenzotti (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;)
              operates mobile games including ChessMatch and RhythmMatch. This
              policy explains what data we collect and how we use it.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Information We Collect
            </h2>
            <p className="mb-2">
              Our apps are designed with your privacy in mind. We collect
              minimal data necessary for app functionality:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <span className="text-zinc-900 dark:text-zinc-100">
                  Usage Data:
                </span>{" "}
                Anonymous analytics to improve app performance (crash reports,
                feature usage, screen views)
              </li>
              <li>
                <span className="text-zinc-900 dark:text-zinc-100">
                  Device Information:
                </span>{" "}
                Device type, OS version, app version, and device identifiers for
                analytics and advertising
              </li>
              <li>
                <span className="text-zinc-900 dark:text-zinc-100">
                  Purchase Data:
                </span>{" "}
                Records of in-app purchases (processed and stored by Apple)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Information We Do NOT Collect
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Personal identification information (name, email, address)
              </li>
              <li>Precise location data</li>
              <li>Contacts or photos</li>
              <li>Payment or financial details (handled securely by Apple)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Third-Party Services
            </h2>
            <p className="mb-2">
              Our apps use third-party services that may collect information:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <span className="text-zinc-900 dark:text-zinc-100">
                  Google AdMob:
                </span>{" "}
                For displaying advertisements. AdMob may collect device
                identifiers, IP address, and usage data for ad personalization
                and measurement. See{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="text-zinc-900 dark:text-zinc-100 underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google&apos;s Privacy Policy
                </a>
              </li>
              <li>
                <span className="text-zinc-900 dark:text-zinc-100">
                  Firebase Analytics:
                </span>{" "}
                For crash reporting, performance monitoring, and usage
                statistics. See{" "}
                <a
                  href="https://firebase.google.com/support/privacy"
                  className="text-zinc-900 dark:text-zinc-100 underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Firebase Privacy
                </a>
              </li>
              <li>
                <span className="text-zinc-900 dark:text-zinc-100">
                  Apple StoreKit:
                </span>{" "}
                For processing in-app purchases. Purchase data is handled by
                Apple per their{" "}
                <a
                  href="https://www.apple.com/privacy/"
                  className="text-zinc-900 dark:text-zinc-100 underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Advertising and Tracking
            </h2>
            <p>
              On iOS 14.5 and later, we request your permission before allowing
              advertisers to track your activity across other companies&apos;
              apps and websites. You can change this preference at any time in
              your device Settings under Privacy &gt; Tracking.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Children&apos;s Privacy
            </h2>
            <p>
              Our apps do not knowingly collect personal information from
              children under 13. If you believe we have collected such
              information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Data Security
            </h2>
            <p>
              We implement appropriate security measures to protect any data
              collected. However, no method of transmission over the internet is
              100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. Changes will
              be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Contact
            </h2>
            <p>
              If you have questions about this policy, contact us at{" "}
              <a
                href="mailto:jacklenzotti@gmail.com"
                className="text-zinc-900 dark:text-zinc-100 underline hover:no-underline"
              >
                jacklenzotti@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
