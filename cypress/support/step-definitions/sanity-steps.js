import { violations } from '../../locators/sanity';

Then('{string} component has no violations in Accessibility section', () => {
  violations().invoke('text').then(($text) => {
    const text = $text.split(' ');
    expect(text[0]).to.be.lessThan(Cypress.env('max_violation_value'));
  });
});
