import React, { useEffect } from 'react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { brandData } from '../data/brandData';

export const PrivacyPolicyPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="w-full pt-32 pb-24 bg-lux-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="LEGAL COMPLIANCE"
          title="Privacy Policy"
          subtitle="How Le Soleil Light protects and manages client and architectural project data."
          align="left"
        />

        <div className="bg-white border border-lux-border p-8 sm:p-12 space-y-6 text-sm text-lux-muted leading-relaxed font-light shadow-card">
          <p>
            At <strong>{brandData.name}</strong>, safeguarding the personal, financial, and architectural confidentiality of our clientele is paramount. This Privacy Policy details our procedures regarding the collection, handling, and security of information obtained through <strong>lesoleillight.com</strong>.
          </p>

          <h3 className="font-serif text-xl text-lux-text font-medium pt-4 border-t border-lux-border">
            1. Information We Collect
          </h3>
          <p>
            We collect personal identification information including your full name, email address, telephonic coordinates, delivery addresses, and CAD/architectural schematics shared for lighting consultations.
          </p>

          <h3 className="font-serif text-xl text-lux-text font-medium pt-4 border-t border-lux-border">
            2. Utilization of Data
          </h3>
          <p>
            Information collected is strictly utilized to process orders, coordinate customized luminaire fabrications, dispatch white-glove insured deliveries, and communicate relevant technical bulletins. We never monetize or sell client data to external marketing vendors.
          </p>

          <h3 className="font-serif text-xl text-lux-text font-medium pt-4 border-t border-lux-border">
            3. Showroom Inquiries & Concierge Contact
          </h3>
          <p>
            For any queries concerning this policy or to request rectification of your records, reach us at <strong>{brandData.contact.email}</strong> or visit our atelier at {brandData.address.line1}, {brandData.address.line2}, {brandData.address.city} – {brandData.address.postalCode}.
          </p>
        </div>
      </div>
    </div>
  );
};

export const ShippingPolicyPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="w-full pt-32 pb-24 bg-lux-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="TRANSIT & WHITE-GLOVE LOGISTICS"
          title="Shipping Details & Transit Insurance"
          subtitle="Uncompromising protection for fragile chandeliers and architectural luminaires."
          align="left"
        />

        <div className="bg-white border border-lux-border p-8 sm:p-12 space-y-6 text-sm text-lux-muted leading-relaxed font-light shadow-card">
          <h3 className="font-serif text-xl text-lux-text font-medium">
            1. Pan-India Insured White-Glove Transit
          </h3>
          <p>
            Due to the delicate nature of K9 optical crystal prisms, electroplated brass bodies, and mouth-blown glass globes, all Le Soleil Light orders are enclosed in reinforced custom wooden crates with multi-density foam shock absorption.
          </p>

          <h3 className="font-serif text-xl text-lux-text font-medium pt-4 border-t border-lux-border">
            2. Transit Insurance & Breakage Guarantee
          </h3>
          <p>
            Every consignment leaves our New Delhi atelier with 100% Comprehensive Transit Insurance. In the rare event of transit damage, we arrange instant complimentary replacement of affected crystal components or fixtures without bureaucratic delays.
          </p>

          <h3 className="font-serif text-xl text-lux-text font-medium pt-4 border-t border-lux-border">
            3. Dispatch & Timeline
          </h3>
          <p>
            In-stock collections dispatch within 24 to 48 hours via premium express couriers. Custom duplex drop lengths or bespoke metal finishes require an additional 5 to 10 artisan business days.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="w-full pt-32 pb-24 bg-lux-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="TERMS OF ATELIER"
          title="Terms & Conditions"
          subtitle="Operating standards and warranty guarantees for Le Soleil Light."
          align="left"
        />

        <div className="bg-white border border-lux-border p-8 sm:p-12 space-y-6 text-sm text-lux-muted leading-relaxed font-light shadow-card">
          <p>
            Welcome to <strong>Le Soleil Light</strong>. By visiting our showroom or ordering through <strong>lesoleillight.com</strong>, you agree to adhere to these terms.
          </p>

          <h3 className="font-serif text-xl text-lux-text font-medium pt-4 border-t border-lux-border">
            1. Luminaire Warranties
          </h3>
          <p>
            All statement chandeliers and architectural fixtures are backed by a minimum 3-year warranty against electrical component defects and LED degradation. Ceiling fans include a 5-year copper motor warranty.
          </p>

          <h3 className="font-serif text-xl text-lux-text font-medium pt-4 border-t border-lux-border">
            2. Professional Installation
          </h3>
          <p>
            Due to the substantial weight of grand duplex chandeliers (up to 50kg), ceiling mounting points must be reinforced according to our structural guidelines. Installation should always be performed by a qualified master electrician.
          </p>
        </div>
      </div>
    </div>
  );
};
