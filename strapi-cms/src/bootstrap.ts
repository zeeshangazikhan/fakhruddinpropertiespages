/**
 * Strapi Bootstrap Lifecycle
 * This file runs when Strapi starts and seeds initial content if empty
 */

export default {
  async bootstrap({ strapi }: { strapi: any }) {
    // Check if Hero content exists
    const heroExists = await strapi.documents('api::hero.hero').findFirst();
    
    if (!heroExists) {
      console.log('🌱 Seeding initial content...');
      
      // Seed Hero
      try {
        await strapi.documents('api::hero.hero').create({
          data: {
            tagline: 'Luxury Living Experience',
            title: 'Treppan Serenique Prive',
            subtitle: 'Expression of Interest',
            description: 'This EOI is simply a declaration of interest to purchase a property within the Project and is not intended to create a legally binding contract.',
            buttonText: 'Express Interest',
            stats: [],
            publishedAt: new Date(),
          },
        });
        console.log('✅ Hero content seeded');
      } catch (e) {
        console.error('❌ Hero seed error:', e);
      }

      // Seed Overview
      try {
        await strapi.documents('api::overview.overview').create({
          data: {
            sectionTitle: 'Available Units',
            totalUnitsLabel: 'Total Available',
            totalUnits: 65,
            projectName: 'Treppan Serenique Prive',
            units: [
              { title: '1 Bed Suite', size: '1,028 sq ft - 1,103 sq ft', count: 20, price: 'Price To Be Announced' },
              { title: '2 Bed Suite', size: '1,617 sq ft - 2,127 sq ft', count: 43, price: 'Price To Be Announced' },
              { title: '4 Bed Penthouse', size: '3,592 sq ft - 3,647 sq ft', count: 2, price: 'Price To Be Announced' },
            ],
            publishedAt: new Date(),
          },
        });
        console.log('✅ Overview content seeded');
      } catch (e) {
        console.error('❌ Overview seed error:', e);
      }

      // Seed EOI Form
      try {
        await strapi.documents('api::eoi-form.eoi-form').create({
          data: {
            sectionTitle: 'Expression of Interest Form',
            depositAmount: 'AED 50,000 (Fifty Thousand Dirhams)',
            depositDescription: 'This amount is refundable if you choose not to proceed',
            developerInfo: {
              name: 'Fakhruddin Properties',
              address: 'Office 123, ABC DEF AAAA 3, Dubai, UAE',
              telephone: '+971 1 234 5678 or 800 ABCD (7236)',
              email: 'EOI@fakhruddinproperties.com',
              reraNumber: '1234',
            },
            eoiSteps: [
              { step: 'The EOI Deposit Cheque will not be cashed and is fully refundable should a Client choose not to proceed with booking a Unit in the Project.', order: 1 },
              { step: 'An acknowledgement receipt for the EOI Deposit Cheque will be issued by Fakhruddin Properties.', order: 2 },
              { step: 'The EOI Deposit Cheque should mention Fakhruddin Properties as the beneficiary.', order: 3 },
              { step: 'The EOI Form should be duly filled with the correct contact information of the Client.', order: 4 },
              { step: 'Any EOI submission missing the above-mentioned documents or information will not be accepted.', order: 5 },
              { step: 'Units will be allocated on a priority basis for Clients ready to complete full payment for their units, followed by higher down payments until reaching the standard payment terms.', order: 6 },
            ],
            processDescription: 'The Interested Party should submit a EOI Deposit Cheque in favour of Fakhruddin Properties within 5 working days of completing this EOI Form in order to finalize their EOI.',
            unitAllocationNote: 'Upon confirmation of Unit Allocation for successful EOIs, the Interested Party must complete payment of 10% of the Property Purchase Price and submit all required documents and information requested by Fakhruddin Properties.',
            refundNote: 'Should the Interested Party choose not to proceed with booking a Unit in the Project, the EOI Deposit Cheque will be returned to the Interested Party within 5 working days.',
            termsAndConditions: `The Developer has called any interested person/s or company (the "Interested Party") to reserve and later purchase some of the proposed properties within the Project, the parties will then proceed to a formal booking form/sale and purchase agreement. The full terms and conditions for the purchase and ownership of the Property will be contained in the sale and purchase agreement with related documents as may be required under relevant Dubai laws (together the "SPA"). The SPA will contain (or be subject to) usual rights and obligations.

The information mentioned above is not an offer or a contract and does not constitute an interest in land. The purpose of this EOI is to provide the Developer's customers with an opportunity to express an interest within the Project prior to the official launch.

The completion and submission of this EOI (and the EOI Amount) in no way obligates the Developer to sell the Property to the Purchaser.

The Developer reserves the right to negotiate with only those interested parties that the Developer determines in its sole discretion. The Developer reserves the right to amend or cancel this EOI at any time prior to entering into a formal booking form/SPA without the requirement for a court order and/or any other formality. In the event that this EOI is cancelled by the Developer, the cheque for the EOI Amount shall be returned to the Interested Party as soon as reasonably practicable.

The Interested Party reserves the right to cancel this EOI at any time prior to entering into a formal booking form/SPA without the requirement for a court order and/or any other formality. In the event that this EOI is cancelled by the Interested Party, the cheque for the EOI Amount shall be returned to the Interested Party as soon as reasonably practicable.

The EOI Amount is provided to confirm the Interested Party's interest in the Property only and is not intended to be used to complete or fund the Project.

This EOI is personal to the Interested Party and is not assignable or transferable and the Interested Party may not at any time assign its rights and obligations under this EOI to any third party without the express written consent of the Developer.`,
            downPaymentOptions: [
              { value: '100', label: '100%', isDefault: false },
              { value: '50', label: '50%', isDefault: false },
              { value: '20', label: '20%', isDefault: true },
            ],
            unitNumberOptions: [
              { value: '1', label: '1', isDefault: true },
              { value: '2', label: '2', isDefault: false },
              { value: '3', label: '3', isDefault: false },
              { value: '4', label: '4', isDefault: false },
              { value: '5', label: '5', isDefault: false },
            ],
            salesManagers: [
              { name: 'Ahmed Al Maktoum', isActive: true },
              { name: 'Sarah Johnson', isActive: true },
              { name: 'Mohammed Rashid', isActive: true },
              { name: 'Fatima Al Nahyan', isActive: true },
              { name: 'James Wilson', isActive: true },
              { name: 'Aisha Khan', isActive: true },
              { name: 'Omar Hassan', isActive: true },
              { name: 'Maria Garcia', isActive: true },
              { name: 'Ali Mahmoud', isActive: true },
              { name: 'Elena Petrova', isActive: true },
            ],
            formSections: [
              { title: 'Interested Party', subtitle: 'Primary applicant details', icon: 'user', order: 1, isOptional: false },
              { title: 'Unit Preferences', subtitle: 'Select your preferred options', icon: 'building', order: 2, isOptional: false },
              { title: 'EOI Value', subtitle: 'Expression of Interest deposit amount', icon: 'dollar', order: 3, isOptional: false },
              { title: 'Fakhruddin Sales Manager', subtitle: 'Select your assigned sales manager', icon: 'users', order: 4, isOptional: false },
              { title: 'Agency Information', subtitle: 'If applicable, provide agency details', icon: 'briefcase', order: 5, isOptional: true },
            ],
            publishedAt: new Date(),
          },
        });
        console.log('✅ EOI Form content seeded');
      } catch (e) {
        console.error('❌ EOI Form seed error:', e);
      }

      console.log('🎉 Initial content seeding complete!');
    } else {
      console.log('📦 Content already exists, skipping seed.');
    }
  },
};
