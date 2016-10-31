import { VfvPkgPage } from './app.po';

describe('vfv-pkg App', function() {
  let page: VfvPkgPage;

  beforeEach(() => {
    page = new VfvPkgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
