import { memo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Eyebrow, Reveal, SplitText } from "../ui/Primitives";
import { FAR } from "../ui/ridgePaths";
import { stagger } from "../ui/stagger";
import logo from "../../assets/logo/satpuda-group-logo-circle.webp";
import {
  ITI_GROUP_SINCE,
  ITI_SITE,
  itiNetwork,
  itiNetworkDistricts,
  networkRow,
} from "../../data/itiNetwork";

const stats = [
  { value: itiNetwork.length, label: "ITI institutes" },
  { value: itiNetworkDistricts.length, label: "Districts" },
  { value: ITI_GROUP_SINCE, label: "Group since" },
];

/**
 * The top of a card: the campus photograph, or — where none is published —
 * a royal panel with the group's mark, the year and the place name, so the
 * row never shows a broken image.
 */
function Media({ inst }) {
  const [failed, setFailed] = useState(false);
  const photo = inst.image && !failed;

  return (
    <span className="relative isolate block aspect-[16/10] overflow-hidden rounded-t-[0.8125rem] bg-royal-950">
      {photo ? (
        <img
          src={inst.image.src}
          alt={inst.image.alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="itin-media absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden="true" className="absolute inset-0">
          <span className="absolute inset-0 bg-[radial-gradient(90%_80%_at_85%_10%,rgba(58,85,159,0.75),transparent_70%)]" />
          {/* the hills, small, along the panel's foot */}
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="itin-media absolute inset-x-0 bottom-0 h-1/2 w-full">
            <path d={`${FAR} V120 H0 Z`} fill="rgb(255 255 255 / 0.05)" />
            <path d={FAR} fill="none" stroke="var(--color-ember-400)" strokeOpacity="0.4" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
        </span>
      )}

      <span
        aria-hidden="true"
        className={`absolute inset-0 ${
          photo
            ? "bg-[linear-gradient(180deg,rgba(12,21,41,0.35)_0%,rgba(12,21,41,0)_32%,rgba(12,21,41,0)_45%,rgba(12,21,41,0.88)_100%)]"
            : "bg-[linear-gradient(180deg,transparent_45%,rgba(12,21,41,0.55)_100%)]"
        }`}
      />

      <span aria-hidden="true" className="absolute inset-0 flex flex-col justify-between p-4">
        <span className="flex items-start justify-between gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_6px_18px_-8px_rgba(0,0,0,0.6)]">
            <img src={logo} alt="" width="40" height="40" loading="lazy" className="h-full w-full object-contain" />
          </span>
          <span className="rounded-md border border-white/25 bg-royal-950/40 px-1.5 py-1 text-[0.625rem] font-semibold uppercase leading-none tracking-[0.12em] tabular-nums text-white backdrop-blur-[2px]">
            Est. {inst.established}
          </span>
        </span>
        <span>
          <span className="flex items-center gap-2">
            <span className="h-0.5 w-5 bg-ember-500" />
            <span className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-white/80">
              {inst.district}
            </span>
          </span>
          <span className="mt-1.5 block font-display text-[1.625rem] font-semibold leading-none tracking-[-0.03em] text-white">
            {inst.place}
          </span>
        </span>
      </span>
    </span>
  );
}

/**
 * One institute — the whole card opens its page on the Satpuda ITI site, or
 * for the college and school their own website; D.Ed & B.Ed (`to`) opens
 * its page here.
 */
function Card({ inst, decorative = false }) {
  const titleId = decorative ? undefined : `itin-card-${inst.id}`;
  const isIti = inst.href?.startsWith(ITI_SITE);
  const Root = inst.to ? Link : "a";
  const target = inst.to
    ? { to: inst.to }
    : { href: inst.href, target: "_blank", rel: "noopener noreferrer" };
  return (
    <Root
      {...target}
      tabIndex={decorative ? -1 : undefined}
      aria-labelledby={titleId}
      className="itin-card group relative flex h-full w-[16.5rem] flex-col rounded-[0.875rem] border border-royal-100 bg-white text-left sm:w-[18.5rem]"
    >
      <Media inst={inst} />
      <span aria-hidden="true" className="itin-card-rule absolute inset-x-0 top-0 z-10 h-[3px] rounded-t-[0.875rem] bg-ember-500" />

      <span className="flex flex-1 flex-col p-4 sm:p-5">
        <span
          id={titleId}
          className="block min-h-[2.75rem] font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em] text-ink sm:min-h-[2.9rem] sm:text-[1.125rem]"
        >
          {inst.name}
          {!inst.to && (
            <span className="sr-only">
              {isIti ? " (opens the Satpuda ITI site in a new tab)" : " (opens its website in a new tab)"}
            </span>
          )}
        </span>
        <span className="mt-1.5 flex items-start gap-1.5 text-[0.8125rem] leading-snug text-ink-mute">
          <MapPin aria-hidden="true" strokeWidth={2} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember-500" />
          {inst.location}
        </span>

        <span className="mt-4 flex flex-wrap gap-1.5">
          {inst.courses.map((c) => (
            <span key={c} className="rounded-md bg-royal-50 px-2 py-1 text-[0.75rem] font-medium leading-none text-royal-800">
              {c}
            </span>
          ))}
        </span>

        <span className="mt-auto block pt-4">
          <span className="flex items-center justify-between border-t border-royal-50 pt-3.5">
            <span className="text-[0.875rem] font-semibold text-ink transition-colors duration-200 group-hover:text-ember-600">
              {isIti || inst.to ? "View institute" : "Visit website"}
            </span>
            <ArrowUpRight aria-hidden="true" strokeWidth={2} className="itin-card-arrow h-4 w-4 text-ember-500" />
          </span>
        </span>
      </span>
    </Root>
  );
}

/* The list twice over, the second copy hidden from assistive tech, so the
   drift loops on half the track with no seam. Memoised: the section only
   re-renders to flip its on-screen flag. */
const Track = memo(function Track() {
  return (
    <div className="itin-track">
      <ul className="itin-group" aria-label="Satpuda institutes, oldest first">
        {networkRow.map((inst) => (
          <li key={inst.id} className="flex">
            <Card inst={inst} />
          </li>
        ))}
      </ul>
      <ul className="itin-group" aria-hidden="true">
        {networkRow.map((inst) => (
          <li key={inst.id} className="flex">
            <Card inst={inst} decorative />
          </li>
        ))}
      </ul>
    </div>
  );
});

/**
 * "Satpuda ITI network" — every Satpuda ITI as a photo card, drifting past
 * in one row, each opening that institute on the Satpuda ITI site.
 *
 * The heading, the three counts and the card row follow the section on
 * satpuda-iti.vercel.app, set in this site's paper, royal and ember. The
 * row holds still while pointed at, while a card has focus and while off
 * screen; under reduced motion it becomes a row you scroll by hand.
 */
export function ItiNetworkSection() {
  const rowRef = useRef(null);
  const onScreen = useInView(rowRef);

  return (
    <section
      id="iti-network"
      aria-labelledby="iti-network-title"
      className="section relative isolate overflow-hidden border-y border-royal-100 bg-white"
    >
      {/* a warm glow in the corner and the hills along the foot — this is
          the one band on the page that reaches beyond our own campus */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_85%_0%,rgba(217,58,38,0.08),transparent_70%),radial-gradient(45%_50%_at_0%_100%,rgba(58,85,159,0.08),transparent_70%)]" />
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 w-full"
      >
        <path d={`${FAR} V120 H0 Z`} fill="var(--color-paper-dim)" fillOpacity="0.7" />
        <path d={FAR} fill="none" stroke="var(--color-ember-500)" strokeOpacity="0.25" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="shell">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Satpuda ITI network</Eyebrow>
            </Reveal>
            <SplitText as="h2" delay={90} className="t-h2 mt-5 block text-ink">
              Our ITI Institutions
            </SplitText>
            <Reveal delay={stagger(2)}>
              <p className="t-lead mt-6">
                Get to know the Satpuda Group's {itiNetwork.length} ITIs, spread across{" "}
                {itiNetworkDistricts.length} districts of Madhya Pradesh. Pick any institute to see
                its trades, principal, contact details and more — set in the order they opened,
                alongside our school, teacher-education college and engineering college.
              </p>
            </Reveal>
          </div>

          <Reveal delay={stagger(3)} className="shrink-0">
            <dl className="grid grid-cols-3 divide-x divide-royal-100 border-y border-royal-100">
              {stats.map((s) => (
                <div key={s.label} className="px-3 py-4 first:pl-0 sm:px-6">
                  <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-ink-mute">
                    {s.label}
                  </dt>
                  <dd className="mt-2 font-display text-[1.75rem] font-semibold leading-none tracking-[-0.02em] tabular-nums text-royal-900 sm:text-[2rem]">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <div ref={rowRef} className="itin-row mt-10 lg:mt-12" data-paused={!onScreen || undefined}>
        <Track />
      </div>

      <div className="shell mt-6 flex justify-end">
        <a
          href={ITI_SITE}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-[2.75rem] items-center gap-2 text-[0.875rem] font-semibold text-royal-700 transition-colors duration-300 hover:text-ember-600"
        >
          Visit the Satpuda ITI site
          <ArrowUpRight aria-hidden="true" strokeWidth={2} className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}
