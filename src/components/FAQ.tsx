import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { faqs } from '../data/programData';

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-cyan">
            FAQ
          </p>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl md:text-4xl">
            Những câu hỏi thường gặp trước khi đăng ký TNV
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={faq.q}
              className={`overflow-hidden rounded-[20px] border transition-all duration-300 sm:rounded-[24px] ${
                openIdx === idx ? 'border-brand-electric shadow-card' : 'border-slate-200'
              }`}
            >
              <button
                type="button"
                aria-expanded={openIdx === idx}
                aria-controls={`faq-panel-${idx}`}
                id={`faq-button-${idx}`}
                className="flex w-full items-center justify-between bg-slate-50 p-4 text-left transition-colors hover:bg-slate-100 sm:p-6"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span className="pr-4 text-base font-semibold text-slate-900 sm:text-lg">{faq.q}</span>
                {openIdx === idx ? (
                  <ChevronUp className="h-5 w-5 flex-shrink-0 text-brand-electric" />
                ) : (
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-slate-400" />
                )}
              </button>

              <div
                id={`faq-panel-${idx}`}
                role="region"
                aria-labelledby={`faq-button-${idx}`}
                className={`overflow-hidden px-4 transition-all duration-300 ease-in-out sm:px-6 ${
                  openIdx === idx ? 'max-h-[520px] bg-white py-5 sm:py-6' : 'max-h-0 py-0'
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
