import { AribauiPage } from './app.po';


describe('aribaui App', function () {
    let page: AribauiPage;

    beforeEach(() => {
        page = new AribauiPage();
    });

    it('should display message saying Playground module', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Playground module');
    });
});
