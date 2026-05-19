import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { faqs, program } from '../data/programData';

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="bg-white py-20" id="faq">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-4xl font-semibold uppercase tracking-[0.2em] text-brand-secondary">
            FAQ
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={faq.q}
              className={`overflow-hidden rounded-[24px] border transition-all duration-300 ${
                openIdx === idx ? 'border-brand-secondary shadow-card' : 'border-brand-border'
              }`}
            >
              <button
                type="button"
                aria-expanded={openIdx === idx}
                aria-controls={`faq-panel-${idx}`}
                id={`faq-button-${idx}`}
                className="flex w-full items-center justify-between bg-brand-surface p-6 text-left transition-colors hover:bg-brand-sky/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-inset"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span className="pr-4 text-lg font-semibold text-slate-900">{faq.q}</span>
                {openIdx === idx ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0 text-brand-secondary" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-400" />
                )}
              </button>

              <div
                id={`faq-panel-${idx}`}
                role="region"
                aria-labelledby={`faq-button-${idx}`}
                className={`overflow-hidden px-6 transition-all duration-300 ease-in-out ${
                  openIdx === idx ? 'max-h-[420px] bg-white py-6' : 'max-h-0 py-0'
                }`}
              >
                <p className="leading-7 text-slate-600">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
