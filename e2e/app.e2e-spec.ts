import { TRIPSORTERPage } from './app.po';

describe('trip-sorter App', () => {
  let page: TRIPSORTERPage;

  beforeEach(() => {
    page = new TRIPSORTERPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
